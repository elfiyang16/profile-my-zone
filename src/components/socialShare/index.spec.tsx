import { shallow, mount } from "enzyme"
import React from "react"
import { axe, toHaveNoViolations } from "jest-axe"
import SocialSharer from "./"

expect.extend(toHaveNoViolations)

describe("SocialSharer", () => {
  it("should match the latest snapshot", () => {
    expect(
      shallow(<SocialSharer blogTitle={"mockPost"} blogSlug={"/mockPost"} />)
    ).toMatchSnapshot()
  })

  it("should check accessibility", async () => {
    const wrapper = mount(
      <SocialSharer blogTitle={"mockPost"} blogSlug={"/mockPost"} />
    )
    const results = await axe(wrapper.getDOMNode())

    expect(results).toHaveNoViolations()
  })
})
