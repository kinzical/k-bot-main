import * as React from "react";
import { shallow } from "enzyme";
import KPDatePicker from "./KPDatePicker";

describe("KPDatePicker", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPDatePicker />);
    expect(wrapper).toMatchSnapshot();
  });
});
