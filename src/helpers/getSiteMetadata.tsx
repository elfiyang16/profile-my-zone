import { graphql, useStaticQuery } from "gatsby";

export const getSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query siteMetadata {
      site {
        siteMetadata {
          defaultTitle: title
          defaultDescription: description
          siteName
          siteUrl
          author
        }
      }
    }
  `);
  return site.siteMetadata;
};
