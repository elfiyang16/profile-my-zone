import  React, {FunctionComponent} from "react"
import Helmet from "react-helmet"
// import {getSiteMetadata} from "../../helpers/getSiteMetaData"

export interface IProps {
  title?: string;
  description?: string;
  path?: string;
  jsonLd?: object; // eslint-disable-line @typescript-eslint/ban-types
  noIndex?: boolean;
}


  const siteMetadata =  {
    defaultTitle: `Elfi Dev Zone`,
    defaultDescription: `A little space for me to try something interesting`,
    author: `@elfi_y`,
    siteUrl: "https://elfi.com",
    siteName: "Elfi Dev Zone",
  };

const SEO :FunctionComponent<IProps> = (props)=> {
  const {
    title,
    description,
    path,
    // jsonLd,
    noIndex,
  } = props;

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    siteName,
    author
  } = siteMetadata;
  //getSiteMetadata();

    const seo = {
      description: description || defaultDescription,
      title: title || defaultTitle,
      url: path !== null && path !== undefined
      ? `${siteUrl}${path}`
      : undefined,
      author: author,
      siteName:siteName
    };
  return (
    <Helmet
    htmlAttributes={{ lang: "en" }}
    title={seo.title}
    >
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <meta name="description" content={seo.description} />
      <meta property="author" content={seo.author} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:site_name" content={seo.siteName} />
      <meta property="og:type" content="website" />
      {seo.url && <meta property="og:url" content={seo.url} />}
    </Helmet>
  )
}

export default SEO
