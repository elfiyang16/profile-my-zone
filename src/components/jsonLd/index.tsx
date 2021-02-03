import React, { FunctionComponent } from "react"
import { Thing, WithContext, BlogPosting } from "schema-dts"
import { IBlog } from "../../types/IBlog"

export interface IJsonLD<T extends Thing> {
  data: WithContext<T>
}
export class JsonLd<T extends Thing> extends React.Component<IJsonLD<T>> {
  public render() {
    const { data } = this.props

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    )
  }
}

export function createBlogJsonLd(post: IBlog): BlogPosting {
  return {
    "@type": "BlogPosting",
    author: "Elfi",
    datePublished: post.publishDate,
    description: post.description ? post.description.description : undefined,
    headline: post.title,
    image: post.heroImage ? post.heroImage.file.url : undefined,
    // mainEntityOfPage: `https://localhost:8000/blog/${post.slug}`,
  }
}

export interface IStructuredData {
  post: IBlog
}

export const StructuredData: FunctionComponent<IStructuredData> = ({
  post,
}) => (
  <JsonLd<BlogPosting>
    data={{
      "@context": "https://schema.org",
      ...createBlogJsonLd(post),
    }}
  />
)
