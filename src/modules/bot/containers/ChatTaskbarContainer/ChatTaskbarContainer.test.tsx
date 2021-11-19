import * as React from "react";
import { shallow } from "enzyme";
import ChatTaskbarContainer from "./ChatTaskbarContainer";

describe("ChatTaskbarContainer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ChatTaskbarContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
