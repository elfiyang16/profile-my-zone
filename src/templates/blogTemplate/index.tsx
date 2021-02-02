import { graphql } from "gatsby"
import React, { FunctionComponent } from "react"
import SEO from "../../components/seo"
import { IBlog } from "../../types/IBlog"
import Layout from "../../components/layout"
import Blog from "../../components/blog"
import "./styles.scss"

export interface IProps {
  data: {
    contentfulBlogPost: IBlog
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
