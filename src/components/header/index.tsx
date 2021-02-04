import { Link, navigate } from "gatsby"
import React, { useState } from "react"
import "./styles.scss"
import dog from "../../images/dog-white.svg"
import burgermenu from "../../images/menu-white.svg"
import closeicon from "../../images/close-icon.png"
import { set } from "lodash"

interface IHeader {
  header: string
}

interface IMenu {
  url: string
  item: string
  menu: boolean
  setMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomLink: React.FC<IMenu> = ({ menu, setMenu, url, item }) => (
  <Link
    to={`${url}`}
    onClick={(e: any) => {
      e.preventDefault()
      setMenu(!menu)
      navigate(url)
    }}
    className="site-header__menu-item"
  >
    {item}
  </Link>
)

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
                <CustomLink setMenu={setMenu} menu={menu} url="/" item="Home" />
                <CustomLink
                  setMenu={setMenu}
                  menu={menu}
                  url="/#blogs"
                  item="Blogs"
                />
                <CustomLink
                  setMenu={setMenu}
                  menu={menu}
                  url="/#about"
                  item="About me"
                />
                <CustomLink
                  setMenu={setMenu}
                  menu={menu}
                  url="/#contact"
                  item="Contact"
                />
              </div>
            ) : (
              <div className="site-header__menu">
                <CustomLink
                  setMenu={setMenu}
                  menu={menu}
                  url="/#home"
                  item="Home"
                />
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
