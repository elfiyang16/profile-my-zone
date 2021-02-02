import { ContentfulRichTextGatsbyReference } from "gatsby-source-contentful/rich-text"

export interface IContentfulRichText<
  T extends ContentfulRichTextGatsbyReference
> {
  raw: string
  references: T[]
}
