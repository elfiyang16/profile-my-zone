import { shallow } from "enzyme"
import React from "react"
import Hero from "."
import { IHero } from "../../types/IHero"

const heroMock: IHero = {
  colorTheme: "",
  heading1: "Some title",
  heading2: "Some other title",
  image: {
    title: "The example",
    file: {
      url: "//images.ctfassets.net/example.png",
    },
  },
}

describe("<Hero />", () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = shallow(<Hero {...heroMock} />)
  })

  it("should render", () => {
    expect(wrapper).toMatchSnapshot()
  })
})
