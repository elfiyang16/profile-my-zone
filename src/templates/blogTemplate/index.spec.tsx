import { shallow } from "enzyme"
import React from "react"
import { mockBlog } from "../../components/blog/index.spec"
import BlogWrapper, { IProps } from "./"

jest.mock("gatsby")

describe("BlogTemplate", () => {
  let wrapper: any
  let IProps: IProps = { data: { contentfulBlogPost: mockBlog } }

  beforeEach(() => {
    wrapper = shallow(<BlogWrapper {...IProps} />)
  })

  it("should render", () => {
    expect(wrapper).toMatchSnapshot()
  })
})
