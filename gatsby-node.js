/* eslint-disable */
/**
 * Implement Gatsby's Node APIs in this file.
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const get = require("lodash/get")
const each = require("lodash/each")
const path = require("path")
const slash = require("slash")

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        lodash: path.resolve(__dirname, "node_modules/lodash"),
        gastby: path.resolve(__dirname, "node_modules/gatsby"),
      },
    },
  })
}

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // The “graphql” function allows us to run arbitrary
  // queries against the local Contentful graphql schema. Think of
  // it like the site has a built-in database constructed
  // from the fetched data that you can run queries against.
  const result = await graphql(
    `
      {
        allContentfulModuleTemplate {
          edges {
            node {
              id
              urlPath
            }
          }
        }
        allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
          edges {
            node {
              slug
              id
            }
          }
        }
      }
    `
  )
  if (result.errors) {
    throw result.errors
  }

  const moduleTemplates = result.data.allContentfulModuleTemplate.edges
  const moduleTemplateIndex = path.resolve(
    "./src/templates/moduleTemplate/index.tsx"
  )

  each(moduleTemplates, moduleTemplate => {
    if (moduleTemplate.node.urlPath) {
      createPage({
        path: moduleTemplate.node.urlPath,
        component: slash(moduleTemplateIndex),
        context: {
          id: moduleTemplate.node.id,
        },
      })
    }
  })

  const posts = result.data.allContentfulBlogPost.edges
  const postsPerPage = 5
  const numPages = Math.ceil(posts.length / postsPerPage)
  const blogList = path.resolve("./src/templates/blogsTemplate/index.tsx")
  const blogWrapper = path.resolve("./src/templates/blogTemplate/index.tsx")

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? "/blogs" : `/blogs/page-${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  each(posts, post => {
    if (post.node.slug) {
      createPage({
        path: `/blog/${post.node.slug}`,
        component: slash(blogWrapper),
        context: {
          id: post.node.id,
        },
      })
    }
  })
}
