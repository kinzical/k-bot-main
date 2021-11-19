import * as React from "react";
import { shallow } from "enzyme";
import ChatSidebar from "./ChatSidebar";

describe("ChatSidebar", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ChatSidebar />);
    expect(wrapper).toMatchSnapshot();
  });
});
