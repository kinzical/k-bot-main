import * as React from "react";
import { shallow } from "enzyme";
import KPOption from "./KPOption";

describe("KPOption", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPOption />);
    expect(wrapper).toMatchSnapshot();
  });
});
