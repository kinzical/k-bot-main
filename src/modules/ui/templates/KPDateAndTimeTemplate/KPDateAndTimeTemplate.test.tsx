import * as React from "react";
import { shallow } from "enzyme";
import KPDateAndTimeTemplate from "./KPDateAndTimeTemplate";

describe("KPDateAndTimeTemplate", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPDateAndTimeTemplate />);
    expect(wrapper).toMatchSnapshot();
  });
});
