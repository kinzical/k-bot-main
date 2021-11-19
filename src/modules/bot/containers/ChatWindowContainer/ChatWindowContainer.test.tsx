import * as React from "react";
import { shallow } from "enzyme";
import ChatWindowContainer from "./ChatWindowContainer";

describe("ChatWindowContainer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ChatWindowContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
