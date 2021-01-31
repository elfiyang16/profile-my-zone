import React from "react";
import { IHero } from "../../types/IHero";

type ColorTheme = "cream-white" ;

const Hero: React.FunctionComponent<IHero> = ({
  colorTheme = "cream-white",
  heading1,
  heading2,
  image,
}) => {
  return (
    <div className={`hero ${colorTheme}`}>
      <div >
        <div >
          <section >
            {heading1 && <h1>{heading1}</h1>}
            {heading2 && <p >{heading2}</p>}
          </section>
          {image && (
            <div >
              <img src={image.file.url} alt={image.title} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero
