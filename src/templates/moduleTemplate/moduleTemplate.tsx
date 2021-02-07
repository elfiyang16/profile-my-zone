/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent } from "react"
import Hero from "../../components/hero"
import Blog from "../../components/blog"
import SEO from "../../components/seo"
import Layout from "../../components/layout"
import { IBlog } from "../../types/IBlog"
import { IHero } from "../../types/IHero"
import { JsonLd } from "../../components/jsonLd"

// import "./styles.scss"

type IComponent = IBlog /* | increment with any other modules */

/* | increment with any other modules */
/* right now IModule === IBlogs */
/* right now IComponent === IBlog */
type IModule<V extends IComponent> = {
  __typename: string
  id: string
} & V

interface IStructuredData {
  internal: {
    content: string
  }
}

interface IProps {
  data: {
    contentfulModuleTemplate: {
      pageTitle?: string
      urlPath?: string
      structuredData?: IStructuredData
      metaDescription?: { metaDescription: string }
      noIndex?: boolean
      hero?: IHero
      blogs?: IModule<IComponent>[]
    }
  }
}

export const componentByTypeName = (typename: string, props: IBlog) => {
  const modules: any = {
    /* eslint-disable-next-line react/display-name  */
    ContentfulBlogPost: ({
      id,
      author,
      slug,
      title,
      description,
      heroImage,
      body,
      publishDate,
    }: any) => (
      <Blog
        key={id}
        author={author}
        slug={slug}
        title={title}
        description={description}
        heroImage={heroImage}
        body={body}
        publishDate={publishDate}
      />
    ),
  }
  const Component = modules[typename]
  return Component ? Component(props) : null
}

export const Main: FunctionComponent<IProps> = ({ data }) => {
  const {
    hero,
    blogs,
    structuredData,
    // pageTitle,
    // urlPath,
    // noIndex,
  } = data.contentfulModuleTemplate

  return (
    <div className="modular-content_container">
      {structuredData &&
        structuredData.internal &&
        structuredData.internal.content && (
          <JsonLd data={JSON.parse(structuredData.internal.content)} />
        )}
      {hero && <Hero {...hero} />}
      {Array.isArray(blogs) &&
        blogs.map(m => {
          const { __typename, ...props } = m
          return componentByTypeName(__typename, props)
        })}
    </div>
  )
}

const ModuleTemplate: FunctionComponent<IProps> = ({ data }) => {
  const { urlPath, pageTitle, noIndex } = data.contentfulModuleTemplate

  return (
    <Layout>
      <SEO title={pageTitle} path={urlPath} noIndex={!!noIndex} />
      <Main data={data} />
    </Layout>
  )
}

export default ModuleTemplate
