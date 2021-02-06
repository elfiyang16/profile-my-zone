import React from "react"
import { shallow } from "enzyme"
import Footer from "./"

describe("<Footer />", () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = shallow(<Footer />)
  })

  it("should render", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("should render footer ", () => {
    expect(wrapper.find(".site-footer").length).toEqual(1)
  })
})
