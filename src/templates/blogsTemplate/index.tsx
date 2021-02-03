import { graphql, Link } from "gatsby"
import React, { FunctionComponent } from "react"
import SEO from "../../components/seo"
import { IBlog } from "../../types/IBlog"
import Layout from "../../components/layout"
import "./styles.scss"
import { PostList } from "../../pages"
import Helmet from "react-helmet"

const endpoint = process.env.GATSBY_ENDPOINT

export interface IProps {
  data: {
    allContentfulBlogPost: {
      edges: [
        {
          node: IBlog
        }
      ]
    }
  }
  pageContext: {
    limit: number
    skip: number
    numPages: number
    currentPage: number
  }
}

export const BlogList: FunctionComponent<IProps> = ({ data, pageContext }) => {
  const posts = data.allContentfulBlogPost.edges

  const { currentPage } = pageContext
  const url = `/blog${currentPage > 1 ? `/page-${currentPage}` : ""}`

  return (
    <Layout>
      <SEO />
      <div className="blog-list">
        <h1 className="blog-list__header">Latest blog articles</h1>
        <div className="blog-list__body">
          {posts.map((blog, index) => (
            <PostList {...blog} key={`blog-${index}`} />
          ))}
        </div>
        <Pagination
          currentPage={pageContext.currentPage}
          totalPages={pageContext.numPages}
        />
      </div>
    </Layout>
  )
}

export interface IPagination {
  currentPage: number
  totalPages: number
}

export const Pagination: FunctionComponent<IPagination> = ({
  currentPage,
  totalPages,
}) => {
  const shouldDisplayPrevious = currentPage > 1
  const shouldDisplayNext = currentPage < totalPages

  const prevPage = currentPage - 1
  const nextPage = currentPage + 1

  const prevPagePath =
    currentPage === 2 ? "/blogs" : `/blogs/page-${currentPage - 1}`
  const nextPagePath = `/blogs/page-${currentPage + 1}`

  return (
    <>
      <Helmet>
        {shouldDisplayPrevious ? (
          <link rel="prev" href={`${endpoint}${prevPagePath}`} />
        ) : null}
        {shouldDisplayNext ? (
          <link rel="next" href={`${endpoint}${nextPagePath}`} />
        ) : null}
      </Helmet>
      <div className="blog-list__pagination">
        {shouldDisplayPrevious ? (
          <div className="prev">
            <Link to={prevPagePath} id="pagination-prev">
              &larr; Go to page {prevPage}
            </Link>
          </div>
        ) : null}
        {shouldDisplayNext ? (
          <div className="next">
            <Link to={nextPagePath} id="pagination-next">
              Go to page {nextPage} &rarr;
            </Link>
          </div>
        ) : null}
      </div>
    </>
  )
}

export const blogList = graphql`
  query blogList($skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      sort: { fields: publishDate, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
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
    }
  }
`

export default BlogList
