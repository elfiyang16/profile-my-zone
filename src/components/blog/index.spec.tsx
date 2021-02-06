import { shallow } from "enzyme"
import React from "react"
import Blog from "."
import { IBlog } from "../../types/IBlog"
export const mockBlog: IBlog = {
  title: "Python Concurrency (i)",
  publishDate: "2020-11-22T00:00+00:00",
  heroImage: {
    title: "Photo on Unsplash",
    file: {
      url: "//images.ctfassets.net/abe.jpeg",
    },
  },
  body: {
    raw: '{"nodeType":"document","data":{},"content":[]}',
  },
  description: {
    description: "description",
  },
  author: { name: "elfi" },
  slug: "/abv",
  id: "1234",
}

describe("<Blog />", () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = shallow(<Blog {...mockBlog} />)
  })

  it("should render", () => {
    expect(wrapper).toMatchSnapshot()
  })
})
