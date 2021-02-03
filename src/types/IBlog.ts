import { IContentfulImage } from "./IContentfulImage"

export interface IBlog {
  id?: string
  author?: { name: string }
  slug?: string
  title: string
  description?: {
    description: string
  }
  body: any
  publishDate?: string
  heroImage?: IContentfulImage
}
