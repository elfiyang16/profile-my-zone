/* eslint-disable */
/**
 * Implement Gatsby's Node APIs in this file.
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const get = require("lodash/get")
const each = require("lodash/each")
const path = require("path")
const slash = require("slash")
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
}
