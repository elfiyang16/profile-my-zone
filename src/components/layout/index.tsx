import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import Header from "../header"
import Footer from "../footer"
import "../../scss/global.scss"

const Layout = (props: LayoutProps) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header header={"home"} />
        <div>
          <main>{props.children}</main>
        </div>
        <Footer />
      </>
    )}
  />
)

interface LayoutProps {
  children: any
}

export default Layout
