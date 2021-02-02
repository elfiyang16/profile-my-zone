import React from "react"
import "./styles.scss"

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="site-footer">
      © {new Date().getFullYear()}, built by Elfi with Gatsby under{" "}
      <a href="https://opensource.org/licenses/MIT">MIT License</a>
    </footer>
  )
}

export default Footer
