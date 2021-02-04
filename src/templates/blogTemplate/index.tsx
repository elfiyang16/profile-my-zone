import { graphql } from "gatsby"
import React, { FunctionComponent } from "react"
import SEO from "../../components/seo"
import { IBlog } from "../../types/IBlog"
import Layout from "../../components/layout"
import Blog from "../../components/blog"
import "./styles.scss"
import SocialSharer from "../../components/socialShare"
import { DiscussionEmbed } from "disqus-react"
interface IProps {
  data: {
    contentfulBlogPost: IBlog
  }
}

interface IDisqus {
  shortname: string
  config: {
    identifier: string /* use slug */
    title: string
  }
}

const disqusConfig: (identifier: string, title: string) => IDisqus = (
  identifier: string,
  title: string
) => {
  return {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier, title },
  }
}

const BlogWrapper: FunctionComponent<IProps> = ({ data }) => {
  const {
    id,
    author,
    slug,
    title,
    description,
    heroImage,
    body,
    publishDate,
  } = data.contentfulBlogPost

  return (
    <Layout>
      <SEO noIndex={false} />
      <Blog
        key={id}
        author={author}
        slug={slug}
        title={title}
        description={description}
        heroImage={heroImage}
        body={body}
        publishDate={publishDate}
      />
      <SocialSharer blogTitle={title} blogSlug={slug} />
      <DiscussionEmbed {...disqusConfig(slug, title)} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      id
      author {
        name
      }
      body {
        raw
      }
      publishDate
      slug
      title
      description {
        description
      }
      heroImage {
        title
        file {
          url
        }
      }
    }
  }
`

export default BlogWrapper
