import { IHero } from "../../../types/IHero"
import { IBlog } from "../../../types/IBlog"

export const heroMock: any = {
  __typename: "ContentfulHero",
  id: "abc",
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

export const gqlResponse: any = {
  contentfulModuleTemplate: {
    id: "abdfd",
    pageTitle: "Testing",
    urlPath: "/test-new-modular-template",
    hero: {
      id: "abc",
      colorTheme: "",
      heading1: "Some title",
      heading2: "Some other title",
      image: {
        title: "The example",
        file: {
          url: "//images.ctfassets.net/example.png",
        },
      },
    },
    modules: [
      {
        __typename: "ContentfulBlogPost",
        id: "bhdkf",
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
      },
    ],
  },
}
