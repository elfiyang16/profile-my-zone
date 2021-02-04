import * as Enzyme from "enzyme"
import ReactSixteenAdapter from "enzyme-adapter-react-16"
Enzyme.configure({ adapter: new ReactSixteenAdapter() })

// @ts-ignore-next-line
global.___loader = {
  enqueue: jest.fn(),
}
