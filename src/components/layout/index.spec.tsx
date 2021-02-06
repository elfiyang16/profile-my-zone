import { shallow } from "enzyme"
import * as gatsby from "gatsby"
import React from "react"
import Layout from "./"

jest.mock("gatsby")

const siteMetadataMock = {
  title: "elfi.com",
}
const useStaticQuerySpy = jest.spyOn(gatsby, "useStaticQuery")
useStaticQuerySpy.mockImplementation(() => ({
  site: { siteMetadata: [] },
}))

describe("Layout", () => {
  it("renders correctly", () => {
    const wrapper = shallow(
      <Layout>
        <div>Some content</div>
      </Layout>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
