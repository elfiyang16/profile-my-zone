import { StaticQuery, graphql } from "gatsby"
import Header from "../header"
import Footer from "../footer"
import "../../scss/global.scss"
import React, { FunctionComponent } from "react"
import "./styles.scss"

interface LayoutProps {
  children: any
}
const Layout: FunctionComponent<LayoutProps> = ({ children }) => (
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
          <main>{children}</main>
        </div>
        <Footer />
      </>
    )}
  />
)

export default Layout
