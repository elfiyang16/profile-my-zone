import React, { FunctionComponent } from "react"
import { RichText } from "../richText"
import { IBlog } from "../../types/IBlog"
import moment from "moment"
import "./styles.scss"

const Blog: FunctionComponent<IBlog> = data => {
  const { title, body, publishDate, heroImage } = data

  return (
    <div className="article">
      <div className="article__img-container">
        <img
          className="article__img"
          src={heroImage.file.url}
          alt={heroImage.title}
        />
        <small className="article__img-title">{heroImage.title}</small>
      </div>
      <article className="article__content">
        <h2 className="article__content-title">{title}</h2>
        <p className="article__content-date">
          {moment(publishDate).format("LL")}
        </p>
        <RichText content={body} />
      </article>
    </div>
  )
}

export default Blog
