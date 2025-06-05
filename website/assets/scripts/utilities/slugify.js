export default function slugify(string) {
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
}
