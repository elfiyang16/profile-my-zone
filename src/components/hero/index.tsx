import React from "react"
import { IHero } from "../../types/IHero"
import "./styles.scss"

type ColorTheme = "cream-white"

const Hero: React.FunctionComponent<IHero> = ({
  colorTheme = "cream-white",
  heading1,
  heading2,
  image,
}) => {
  return (
    <div className={`hero ${colorTheme}`} role="region" aria-label="Main hero">
      {image && (
        <div className="hero__img-wrapper">
          <img src={image.file.url} alt={image.title} className="hero__img" />
        </div>
      )}
      <section className="hero__header-wrapper">
        {heading1 && <h1 className="hero__header-primary">{heading1}</h1>}
        {heading2 && <h3 className="hero__header-secondary">{heading2}</h3>}
      </section>
    </div>
  )
}

export default Hero
