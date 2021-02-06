import React from "react"
import { shallow } from "enzyme"
import Header, { IHeader } from "./"

describe("<Header />", () => {
  const defaultProps: IHeader = {
    header: "home",
  }

  let wrapper: any
  beforeEach(() => {
    wrapper = shallow(<Header {...defaultProps} />)
  })

  it("should render", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("should render burger menu ", () => {
    expect(wrapper.find(".site-header__burger-menu").length).toEqual(1)
  })
})
