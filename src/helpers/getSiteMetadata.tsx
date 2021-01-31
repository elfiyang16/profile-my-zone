import { graphql, useStaticQuery } from "gatsby";
/* DISABLE COMPONENBT DUE TO https://github.com/gatsbyjs/gatsby/issues/26563 */
export const getSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query siteMetadata {
      site {
        siteMetadata {
          defaultTitle: title
          defaultDescription: description
          author
          siteName
          siteUrl
        }
      }
    }
  `);
  return site.siteMetadata;
};
