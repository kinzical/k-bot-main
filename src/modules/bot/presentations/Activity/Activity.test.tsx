import * as React from "react";
import { shallow } from "enzyme";
import Activity from "./Activity";

describe("Activity", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Activity />);
    expect(wrapper).toMatchSnapshot();
  });
});
