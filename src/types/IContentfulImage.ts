export interface IContentfulImage {
  id?: string
  title: string
  altText?: string
  file: {
    url: string
    fileName?: string
    contentType?: string
  }
}
