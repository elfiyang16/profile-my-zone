import React, { FunctionComponent } from "react"
import { RichText } from "../../components/RichText"
import { IBlog } from "../../types/IBlog"


const Blog: FunctionComponent<IBlog> = ( data ) => {
  const { author, title, slug, description, body, publishDate, heroImage } = data

  return (
    <div className="article__wrapper">
      <article className="article">
        <h1 className="post-title">{title}</h1>
         <RichText
          contrastText={false}
          content={body}
          stripEmptyParagraphTags
        />
      </article>
    </div>
  )
}


export default Blog
