import React, { FunctionComponent } from "react"
import twitterIcon from "../../images/twitter.png"
import "./styles.scss"

export interface IProps {
  blogTitle: string
  blogSlug: string
}

const SocialSharer: FunctionComponent<IProps> = ({ blogTitle, blogSlug }) => {
  const twitterUrl = getTwitterUrl(blogTitle, blogSlug)

  return (
    <div
      className="social-share"
      role="region"
      aria-label="Social sharing button"
    >
      <p className="social-share_wrapper">
        Share on:{" "}
        <a
          className="social-share__link"
          href={twitterUrl}
          rel="nofollow"
          target="_blank"
          title="Share on Twitter"
        >
          <img className="social-share__icon" src={twitterIcon} alt="Twitter" />
        </a>
      </p>
    </div>
  )
}

export function getTwitterUrl(blogTitle: string, blogSlug: string) {
  const base = "https://twitter.com/intent/tweet"
  const title = encodeURIComponent(blogTitle)
  const url = encodeURIComponent(`https://localhost:8000/blog/${blogSlug}`)

  return `${base}/?text=${title}&url=${url}&via=elfi`
}

export default SocialSharer
