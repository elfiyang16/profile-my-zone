/* eslint-disable */
const unionBy = require("lodash/unionBy")
const path = require("path")

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}` /* e.g. dev */,
})

let contentfulConfig

try {
  contentfulConfig = require("./.contentful")
} catch (_) {}

contentfulConfig = {
  downloadLocal: false,
  spaceId: contentfulConfig.spaceId,
  accessToken:
    contentfulConfig.deliveryAccessToken || contentfulConfig.previewAccessToken,
  host: process.env.CONTENTFUL_HOST, // default - cdn.contentful.com
  // environment: config.get("contentfulEnv"),
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the delivery token need to be provided."
  )
}

module.exports = {
  siteMetadata: {
    title: `Elfi Dev Zone`,
    description: `A little space for me to try something interesting`,
    author: `@elfi_y`,
    siteUrl: "https://elfi.com",
    siteName: "Elfi Dev Zone",
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: spaceId,
        accessToken: accessToken,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Elfi Zone`,
        short_name: `Elfi Zone`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/oriento-tea.png`,
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        // The example below will exclude the single `path/to/page` and all routes beginning with `category`
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }

          allSitePage {
            edges {
              node {
                path
              }
            }
          }
          allContentfulModuleTemplate(filter: {doNotIndex: {eq: true}}) {
            edges {
              node {
                path: urlPath
                doNotIndex
              }
            }
          }
      }`,
        serialize: ({ allSitePage, site, allContentfulModuleTemplate }) => {
          const allSitePageNodes = allSitePage.edges.map(e => e.node)
          const allContentfulModuleTemplateNodes = allContentfulModuleTemplate.edges.map(
            e => e.node
          )

          const indexedPages = unionBy(
            allContentfulModuleTemplateNodes,
            allSitePageNodes,
            "path"
          ).filter(p => !p.doNotIndex)

          return indexedPages.map(page => ({
            url: site.siteMetadata.siteUrl + page.path,
          }))
        },
      },
    },
  ],
}
