import { Link } from "gatsby"
import React, { useState } from "react"
import "./styles.scss"
import dog from "../../images/dog-white.svg"
import burgermenu from "../../images/menu-white.svg"
import closeicon from "../../images/close-icon.png"

interface IHeader {
  header: string
}

const Header: React.FunctionComponent<IHeader> = ({ header }) => {
  const [menu, setMenu] = useState<boolean>(false)

  return (
    <header className={`site-header ${menu ? "active" : ""}`}>
      <div className="site-header__container">
        <div className="site-header__main">
          <div>
            <Link to="/">
              <img src={dog} alt="home logo" className="site-header__logo" />
            </Link>
          </div>
          <nav
            className="site-header__responsive-menu-bar"
            tabIndex={0}
            onClick={(e: any) => setMenu(!menu)}
          >
            <button>
              <img
                src={burgermenu}
                alt="menu logo"
                className="site-header__burger-menu"
              />
            </button>
            {header === "home" ? (
              <div className="site-header__menu">
                <button className="site-header__menu-close">
                  <img src={closeicon} alt="close" />
                </button>
                <Link to="/#home" className="site-header__menu-item">
                  Home
                </Link>
                <Link to="/#blogs" className="site-header__menu-item">
                  Blogs
                </Link>
                <Link to="/#about" className="site-header__menu-item">
                  About me
                </Link>
              </div>
            ) : (
              <div className="site-header__menu">
                <Link to="/#home" className="site-header__menu-item">
                  Home
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
