import * as React from "react";
import { shallow } from "enzyme";
import Taskbar from "./Taskbar";

describe("Taskbar", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Taskbar />);
    expect(wrapper).toMatchSnapshot();
  });
});
