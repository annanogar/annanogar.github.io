type Image = string | { src: string; alt: string }

interface Badge {
  variant?: 'bright' | 'dark'
  href: string
  title: string
}

interface Social {
  href: string
  title: string
}

interface Button {
  href: string
  title: string
}

// Component props — each interface mirrors the macro arguments of the matching
// organism (article-content, image-grid, …) with no build-time concerns mixed in.
interface ArticleContent {
  richtext: string
  button?: Button
}

interface ArticleContentImage {
  variant: 'left' | 'right' | 'right-reversed'
  image: Image
  richtext: string
}

interface ImageGrid {
  title: string
  richtext: string
  images: Image[]
}

interface ArticleHighlight {
  title: string
  text: string
}

interface ArticleQuote {
  quote: string
}

interface VideoPlayer {
  video: string
  ratio: '16x9' | '16x10'
}

// Content blocks: the component props plus the `type` discriminant used only to pick a
// component in the page for-loops. They form a discriminated union keyed on `type`, so
// `satisfies` validates each authored block against its shape (e.g. an `image-grid`
// block is required to carry `images`).
interface ArticleContentBlock extends ArticleContent {
  type: 'article-content'
}

interface ArticleContentImageBlock extends ArticleContentImage {
  type: 'article-content-image'
}

interface ImageGridBlock extends ImageGrid {
  type: 'image-grid'
}

interface ArticleHighlightBlock extends ArticleHighlight {
  type: 'article-highlight'
}

interface ArticleQuoteBlock extends ArticleQuote {
  type: 'article-quote'
}

interface VideoPlayerBlock extends VideoPlayer {
  type: 'video-player'
}

export type ContentBlock = ArticleContentBlock | ArticleContentImageBlock | ImageGridBlock | ArticleHighlightBlock | ArticleQuoteBlock | VideoPlayerBlock

export interface Project {
  href: string
  menu_title: string
  menu_aria_label: string
  card_title: string
  card_subtitle: string
  card_image: Image
  title: string
  description: string
  subtitle: string
  header_image: Image
  label: string
  awards: { title: string; description: string }[]
  recognitions: { title: string; description: string }[]
  credits: { title: string; description: string }[]
  copyright: string
}

export interface Resource {
  slug: string
  href: string
  menu_title: string
  menu_aria_label: string
  title: string
  title_with_markup: string
  description: string
  subtitle: string
  subtitle_short: string
  cta_quote: string
}

export interface Section {
  slug: string
  href: string
  menu_title: string
  menu_aria_label: string
  card_title: string
  card_subtitle?: string
  card_image: Image
  textcard_title: string
  textcard_subtitle: string
  title: string
  description: string
  subtitle?: string
  subtitle_2?: string
  cta_quote: string
}

// The optional keys of T, then a shape that sets each of them to null. A defaults
// object typed `Defaults<Section>` must list exactly the interface's optional keys
// (TS errors if one is missing or a required key is added), keeping the runtime
// optional-materialization in nunjucks.data.js in sync with the interface.
type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T]
export type Defaults<T> = { [K in OptionalKeys<T>]-?: null }
