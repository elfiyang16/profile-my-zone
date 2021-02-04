import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import Contact from "../components/contact"
import moment from "moment"
import { IBlog } from "../types/IBlog"
import { StructuredData } from "../components/jsonLd"
import profile from "../images/profile-me.png"
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
      <SEO
        title="Home"
        description="Home page"
        jsonLd={{
          "@context": "https://schema.org",
          address: {
            sameAs: ["https://www.linkedin.com/in/elfiyang/"],
          },
        }}
      />
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
            blogs.map((blog, i) => <PostList {...blog} key={`hp-blog-${i}`} />)}
        </div>
      </section>
      <section className="about" id="about">
        <h2 className="about__header">About me</h2>
        <div className="about__container">
          <img className="about__img" src={profile} />
          <p className="about__text">
            &nbsp; &nbsp;Elfi is a Fullstack engineer on JavaScript and Python.
            She always thought language was her thing and studied German
            Literature at the uni. But now she works on machine languages. Well,
            they are all languages.
            <br />
            &nbsp; &nbsp;When not coding, She loves to experiment new spices and
            invent fusion recipes like Thai green curry risotto, spicy Sichuan
            burger, pesto roasted tofu, etc.
          </p>
        </div>
      </section>
      <section className="contact" id="contact">
        <h2 className="contact__header">Contact</h2>
        <Contact />
      </section>
    </Layout>
  )
}

export const PostList = (blog: { node: IBlog }) => (
  <div className="blogs__item">
    <Link className="blogs__link" to={`/blog/${blog.node.slug}`}>
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
    <StructuredData post={blog.node} />
  </div>
)

export default IndexPage
