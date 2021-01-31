/* eslint-disable */
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-typescript`,
  ],
}
