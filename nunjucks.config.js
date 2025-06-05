/*
 * Nunjucks Configuration
 * https://mozilla.github.io/nunjucks/api.html
 */

import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { join as joinPath, resolve as resolvePath } from 'node:path'
import nunjucks from 'nunjucks'
import config from './sonic.config.js'

const HASH_CACHE = {}

const getFileHash = (filePath = '', urlSafe = true) => {
  if (!filePath) {
    return ''
  }

  filePath = resolvePath(process.cwd(), joinPath(config.project.destinationPath + config.project.staticURI, filePath))

  if (HASH_CACHE[filePath]) {
    return HASH_CACHE[filePath]
  }

  if (!existsSync(filePath)) {
    return ''
  }

  const shasum = createHash('sha1')
  const data = readFileSync(filePath)
  shasum.update(data, 'utf-8')
  const hash = shasum.digest(urlSafe ? 'base64url' : 'base64')

  HASH_CACHE[filePath] = hash

  return hash
}

// Variable are nunjucks properties that can be called, like so: {{ variable }}
const variables = {
  page_title: '',
  site_title: '',
  site_description: '',
  opengraph_title: '',
  opengraph_url: '',
  opengraph_image: '',
  opengraph_site_name: '',
  opengraph_description: '',
  static_path: '/static/',
  cached_hash: Math.random().toString(36).slice(2, -2), // Added this hash to speed up SortSite scanning, since it treats each asset with a different query parameter separately. Since this hash will be calculated once (as opposed to using random_hash() in the template) this speeds scanning up greatly.
  icon_set: '', // Set iconset for use in templates
}

// Tags are nunjucks functions that can be called with one or more arguments, like so: {{ tag() }}
const tags = {
  // Log arguments on the command line for debugging.
  debug: (...args) => console.log(...args),

  // Get random int between min and max
  random_int: (min = 0, max = 1) => Math.floor(Math.random() * (max - min + 1) + min),

  // Split string by key (such as a comma-separated list)
  split: (string = '', key = '') => string.toString().split(key.toString()),

  // Pad start of string
  pad_start: (string = '', length = 1, pad = ' ') => (string || '').toString().padStart(length, pad),

  // Pad end of string
  pad_end: (string = '', length = 1, pad = ' ') => (string || '').toString().padEnd(length, pad),

  // Merge two objects (shallow)
  merge: (...args) => Object.assign(...args),

  // Replace a value by key in an object, useful since we can't directly manipulate objects in Nunjucks.
  object_replace_value: (object = {}, key = '', original, replacement) => {
    if (original !== null || object[key] === original) {
      object[key] = replacement
    }
  },

  // Set a property in an object, useful since we can't directly manipulate objects in Nunjucks.
  object_set_value: (object = {}, key = '', value = '') => {
    object[key] = value
  },

  // Set multiple properties in an object, useful since we can't directly manipulate objects in Nunjucks.
  object_set_values: (object = {}, properties = {}) => {
    Object.entries(properties).forEach(([key, value]) => {
      object[key] = value
    })
  },

  // Propagate value through object for multiple keys.
  propagate_value: (object = {}, keys = [], defaultValue = '') => {
    let previousValue

    keys.forEach(key => {
      if (!object[key]) {
        object[key] = previousValue || defaultValue
      }

      previousValue = object[key]
    })

    return object
  },

  // Generate placeholder images.
  // Input: object with sizes for each breakpoint
  // Output: Object with image sources for each breakpoint
  // We can specify height and width for each 'breakpoint' like so: sizes = { mobile: '640x480', portrait: '800x600' }
  // Or, we can only specify heights and a ratio, like so: sizes = { mobile: 640, portrait: 800 }, ratio = '16:9'
  // We can also specify the amount of retina values that need to be generated, like so: retinas = [2, 3, 4] for up to 4x
  generate_placeholders: (sizes = {}, ratio = '16:9', retinas = [2 /*, 3, 4 */]) => {
    // Get widths if not supplied - from ratio, if possible
    for (const [key, value] of Object.entries(sizes)) {
      let size = value.toString().split('x')

      if (size.length === 1) {
        if (ratio) {
          const ratioSplit = ratio.toString().split(':')

          size = `${value}x${Math.round((value / ratioSplit[0]) * ratioSplit[1])}`
        } else {
          size = `${value}x${value}`
        }

        sizes[key] = size
      }
    }

    // Add retina sizes
    for (const [key, value] of Object.entries(sizes)) {
      for (const i of retinas) {
        const splitSize = value.toString().split('x')

        sizes[`${key}${i}x`] = `${splitSize[0] * i}x${splitSize[1] * i}`
      }
    }

    // Add placeholder urls
    for (const [key, value] of Object.entries(sizes)) {
      const splitSize = value.toString().split('x')
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${splitSize[0]}" height="${splitSize[1]}" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice">
          <rect fill="#170f3d" x="-1000%" y="-1000%" width="2100%" height="2100%"/>
          <text fill="#666" font-family="Helvetica" font-size="24" text-anchor="middle" alignment-baseline="middle" transform="matrix(1 0 0 1 160 120)">${value.replace('x', '×')}</text>
        </svg>`.replace(/(\n|\s\s)+/g, '')

      sizes[key] = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
    }

    return sizes
  },

  // DJANGO SPECIFIC: Support translatable strings via dummy function, for Django translations.
  _: string => string,

  // Use static paths and add a version hash to the end of the path to bust the cache.
  asset_with_hash: (string = '', addFileHash = true) => `${config.project.staticURI}/${string}${addFileHash ? `?v=${getFileHash(string)}` : ``}`,

  // Render an object with a bound macro or with a default macro if it is unbound and optionally overwrite some values.
  // TODO: Rewrite without destructuring.
  render: (object = {}, defaultMacro = null, override = null) => {
    let macro, value

    if (object.length === 2) {
      ;[macro, value] = object
    } else if (defaultMacro) {
      ;[macro, value] = [defaultMacro, object]
    } else {
      console.log('Nunjucks: render() received an object without macro and no default macro was defined.')

      return ''
    }

    if (override) {
      value = { ...value, ...override }
    }

    return macro({ ...value, __keywords: true })
  },

  // Check if the objects in an array have a certain property
  array_value_property_exists: (array = [], key = '') => {
    for (const values of array) {
      if (values[key]) {
        return true
      }
    }

    return false
  },

  // Use to generate a list of attribute and value pairs
  // Transforms [{ key: 'foo', value: 'bar' }] to 'foo="bar"'
  serialize_key_value_list_to_html_attributes: (list = []) => {
    return list.map(({ key, value }) => `${key}="${value}"`).join(' ')
  },

  // Check if string contains substring
  contains_substring: (string = '', substring = '') => {
    return string && substring && string.indexOf(substring) !== -1
  },
}

// Stub for thumbnail generation, for use in Django.
tags.generate_picture = (obj, ...args) => ({ ...obj, images: tags.generate_placeholders(...args) })

// Filters are nunjucks functions that can be called on a single argument, like so: {{ 'string'|filter }}
const filters = {
  // Interpolate a template string with the current context.
  interpolate: function (str) {
    return nunjucks.renderString(str, this.ctx)
  },

  // Get a random hash with optional prefix.
  random_hash: (prefix = '') => prefix.toString() + Math.random().toString(36).slice(2, -2),

  // Convert to string and trim whitespace.
  // TODO: Rename this, it overwrites Nunjucks "trim" filter!
  trim: (string = '') => string.toString().trim(),

  // Split string by key (such as a comma-separated list)
  split: (string = '', key = '') => string.toString().split(key.toString()),

  // Convert from Base64 to string.
  atob: (string = '') => Buffer.from(string, 'base64').toString('utf8'),

  // Convert string to Base64.
  btoa: (string = '') => Buffer.from(string).toString('base64'),

  // Slugify string, for use in ID's and such.
  slugify: function (string = '') {
    const sources = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;'
    const replacements = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------'
    const parts = new RegExp(sources.split('').join('|'), 'g')

    let result = string.toString()

    result = result.toLowerCase()
    result = result.replace(/\s+/g, '-') // Replace spaces with -
    result = result.replace(parts, character => replacements.charAt(sources.indexOf(character))) // Replace special characters
    result = result.replace(/&/g, '-and-') // Replace & with 'and'
    result = result.replace(/[^\w-]+/g, '') // Remove all non-word characters
    result = result.replace(/--+/g, '-') // Replace multiple dashes with a single dash
    result = result.replace(/^-+/, '') // Trim - from start of text
    result = result.replace(/-+$/, '') // Trim - from end of text

    return result
  },

  // Format object as JSON string.
  to_json: (object = {}, escapeQuotes = false) => JSON.stringify(object).replace(/"/g, escapeQuotes ? '\\"' : '"'),

  // Split string by space
  split_by_space: (string = '') => string.toString().split(' '),

  // Get index of object in array by key/value
  index_by_value: (array = [], key, value) => {
    for (const [i, values] of Object.entries(array)) {
      if (values[key] && values[key] === value) {
        return i
      }
    }

    return -1
  },
}

// Block tags are Nunjucks tags that can be used to customize parsing and rendering of blocks, like so: {% blocktag %}...{% endblocktag %}
const blockTags = {
  /*
  CustomTag: function (env) {
    this.tags = ['customtag']

    this.parse = function (parser, nodes, lexer) {
      const tok = parser.nextToken()
      const args = parser.parseSignature(null, true)

      parser.advanceAfterBlockEnd(tok.value)

      return new nodes.CallExtension(this, 'run', args)
    }

    this.run = function (context, args) {
      return '<span>This is a custom tag.</span>'
    }
  },
  */
}

// Nunjucks configuration
export default function (api) {
  const manageEnv = function (env) {
    // Set global variables
    env.addGlobal('environment', api.env)

    // Set variables, tags, filters and block tags.
    Object.entries(variables).forEach(([key, value]) => env.addGlobal(key, value))
    Object.entries(tags).forEach(([key, value]) => env.addGlobal(key, value))
    Object.entries(filters).forEach(([key, value]) => env.addFilter(key, value))
    Object.keys(blockTags).forEach(key => env.addExtension(key, new blockTags[key](env)))

    // Allow the getting and setting of global context variables in templates.
    env.addGlobal('get_global', key => env.getGlobal(key))
    env.addGlobal('set_global', (key, value) => env.addGlobal(key, value))
  }

  let mockData = {}

  try {
    const contentData = readFileSync(resolvePath(process.cwd(), config.mockData.sourcePath, 'content.json'), 'utf-8')
    mockData = contentData ? { content: JSON.parse(contentData) } : {}
  } catch {}

  return {
    nunjucks: {
      path: resolvePath(process.cwd(), config.project.sourcePath),
      ext: '.html',
      data: { mockData },
      manageEnv,
      loaders: [new nunjucks.FileSystemLoader(resolvePath(process.cwd(), config.project.sourcePath))],
    },
    envOptions: {
      autoescape: false,
      throwOnUndefined: false,
      trimBlocks: true,
      lstripBlocks: true,
      watch: false,
      noCache: false,
      async: false,
      web: null,
      express: null,
      tags: null,
    },
  }
}
