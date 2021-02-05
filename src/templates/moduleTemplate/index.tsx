import { graphql } from "gatsby"

import ModuleTemplate from "./moduleTemplate"

export const pageQuery = graphql`
  query($id: String!) {
    contentfulModuleTemplate(id: { eq: $id }) {
      id
      pageTitle
      urlPath
      structuredData {
        internal {
          type
          content
        }
      }
      noIndex: doNotIndex
      hero {
        ...hero
      }
      blogs {
        __typename
        ... on Node {
          ...blog
        }
      }
    }
  }

  fragment hero on ContentfulHero {
    id
    colorTheme
    heading1
    heading2
    image {
      title
      file {
        contentType
        fileName
        url
      }
    }
    entryTitle
  }

  fragment blog on ContentfulBlogPost {
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
        contentType
        fileName
        url
      }
    }
  }
`

export default ModuleTemplate
