import { shallow } from "enzyme"
import { StaticQuery } from "gatsby"
import { cloneDeep } from "lodash"
import React from "react"
import { JsonLd } from "../../components/jsonLd"
import { Main } from "./moduleTemplate"
import { gqlResponse } from "./__fixtures__/mock"

jest.mock("gatsby")

let data: any
beforeEach(() => {
  data = cloneDeep(gqlResponse)
  ;(StaticQuery as jest.Mock).mockImplementationOnce(({ render }) =>
    render({
      site: {
        siteMetadata: {
          title: "elfi dev zone",
        },
      },
    })
  )
})

describe("Main", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Main data={data as any} />)

    expect(wrapper).toMatchSnapshot()
  })

  it("should render <JsonLd /> correctly if structuredData is passed", () => {
    const newData = {
      contentfulModuleTemplate: {
        ...data.contentfulModuleTemplate,
        structuredData: {
          internal: {
            content: `{
              "@type": "Blog",
              "@context": "https://schema.org",
              "itemListElement": [
                {
                  "item": { "@id": "https://elfiy.com", "name": "Home" },
                  "@type": "ListItem",
                  "position": 1
                }
              ]
            }`,
          },
        },
      },
    }
    const wrapper = shallow(<Main data={newData as any} />)

    expect(wrapper.find(JsonLd).length).toBe(1)
  })
})
