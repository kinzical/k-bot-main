import * as React from "react";
import { shallow } from "enzyme";
import KPDateTemplate from "./KPDateTemplate";

describe("KPDateTemplate", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPDateTemplate />);
    expect(wrapper).toMatchSnapshot();
  });
});
