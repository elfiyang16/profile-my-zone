import { BLOCKS } from "@contentful/rich-text-types"
import { shallow } from "enzyme"
import React from "react"
import { IProps, RichText } from "."
import { IContentfulRichText } from "../../types/IContentfulRichText"

describe("<RichText />", () => {
  const mockRichText: any = {
    json: {
      content: [
        {
          content: [
            {
              data: {},
              marks: [],
              nodeType: "text",
              value: "Hello world!",
            },
          ],
          data: {},
          nodeType: BLOCKS.PARAGRAPH,
        },
      ],
      data: {},
      nodeType: BLOCKS.DOCUMENT,
    },
  }

  const defaultProps: IProps = {
    content: mockRichText,
  }

  const doRender = (props: Partial<IProps> = {}) =>
    shallow(<RichText {...defaultProps} {...props} />)

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should render", () => {
    const wrapper = doRender()
    expect(wrapper).toMatchSnapshot()
  })

  it("should render null if no content property", () => {
    const wrapper = doRender({ content: undefined })
    expect(wrapper.type()).toBeNull()
  })
})
