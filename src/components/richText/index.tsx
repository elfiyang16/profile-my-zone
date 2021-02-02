import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import React, { ReactNode, useEffect, useState } from "react"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import cx from "classnames"
// import { IContentfulRichText } from "../../types/IContentfulRichText"
import "./styles.scss"

export interface IProps {
  className?: string
  content?: any
}

const richTextOption: ReactNode = {
  renderNode: {
    [BLOCKS.DOCUMENT]: (_: unknown, children: ReactNode) => (
      <section className="rich-text-element">{children}</section>
    ),
    [BLOCKS.PARAGRAPH]: (_: unknown, children: ReactNode) => (
      <p className="rich-text-element">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_: unknown, children: ReactNode) => (
      <h1 className="rich-text-element">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_: unknown, children: ReactNode) => (
      <h2 className="rich-text-element">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_: unknown, children: ReactNode) => (
      <h3 className="rich-text-element">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_: unknown, children: ReactNode) => (
      <h4 className="rich-text-element">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (_: unknown, children: ReactNode) => (
      <h5 className="rich-text-element">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (_: unknown, children: ReactNode) => (
      <h6 className="rich-text-element">{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (_: unknown, children: ReactNode) => (
      <ul className="rich-text-element">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_: unknown, children: ReactNode) => (
      <ol className="rich-text-element">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_: unknown, children: ReactNode) => (
      <li className="rich-text-element">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_: unknown, children: ReactNode) => (
      /* add render for quote */
      <strong className="rich-text-element">{children}</strong>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (_: any) => {
      const { url } = _.data.target.fields.file["en-US"]
      return url && <img className="rich-text-element" src={url} alt="Img" />
    },
    [BLOCKS.EMBEDDED_ENTRY]: (_: any) => {
      return ["javascript", "ruby", "python", "go"].map((lang, idx) => (
        <pre key={idx} className="code-example">
          {_.data.target.fields[lang]}
        </pre>
      ))
    },
  },
  renderMark: {
    [MARKS.BOLD]: (text: string) => {
      ;<strong>{text}</strong>
    },
    [MARKS.CODE]: (text: string) => <code className="red">{text}</code>,
  },
  renderText: (text: string) =>
    text.split("\n").flatMap((text, i) => [i > 0 && <br />, text]),
}

export const RichText: React.FunctionComponent<IProps> = ({
  content,
  className,
}) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  if (!content) {
    return null
  }

  return (
    <div
      className={cx(className, "rich-text-container")}
      role="region"
      aria-label={`Rich text ${className}`}
    >
      {renderRichText(content, richTextOption)}
    </div>
  )
}
