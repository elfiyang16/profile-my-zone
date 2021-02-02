import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import moment from "moment"
import "./styles.scss"

export const query = graphql`
  query {
    allContentfulHero(filter: { entryTitle: { eq: "hero/dark-orange" } }) {
      edges {
        node {
          heading1
          heading2
          image {
            title
            file {
              url
            }
          }
        }
      }
    }
    allContentfulBlogPost(
      limit: 10
      sort: { fields: publishDate, order: DESC }
    ) {
      edges {
        node {
          publishDate
          slug
          description {
            description
          }
          title
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

const IndexPage = ({ data }: any) => {
  const {
    colorTheme,
    heading1,
    heading2,
    image,
  } = data.allContentfulHero.edges[0].node
  const blogs = data.allContentfulBlogPost.edges
  return (
    <Layout>
      <SEO title="Home" />
      <Hero
        heading1={heading1}
        heading2={heading2}
        colorTheme={colorTheme}
        image={image}
      />
      <section className="blogs" id="blogs">
        <h2 className="blogs__header">Blogs</h2>
        <div className="blogs__list">
          {blogs &&
            Array.isArray(blogs) &&
            blogs.map((blog, i) => (
              <div className="blogs__item">
                <Link className="blogs__link" to={`${blog.node.slug}`}>
                  <div className="blogs__item-img-container">
                    <img
                      className="blogs__item-img"
                      src={blog.node.heroImage.file.url}
                      alt={blog.node.heroImage.title}
                    />
                  </div>
                  <div className="blogs__item-text-container">
                    <h3 className="blogs__item-header">{blog.node.title}</h3>
                    <p className="blogs__item-description">
                      {blog.node.description.description}
                    </p>
                    <p className="blogs__item-date">
                      {moment(blog.node.publishDate).format("LL")}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
