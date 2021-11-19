import * as React from "react";
import { shallow } from "enzyme";
import ChatSidebarContainer from "./ChatSidebarContainer";

describe("ChatSidebarContainer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ChatSidebarContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
