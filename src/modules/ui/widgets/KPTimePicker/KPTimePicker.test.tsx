import * as React from "react";
import { shallow } from "enzyme";
import KPTimePicker from "./KPTimePicker";

describe("KPTimePicker", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPTimePicker />);
    expect(wrapper).toMatchSnapshot();
  });
});
