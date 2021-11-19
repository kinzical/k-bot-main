import * as React from "react";
import { shallow } from "enzyme";
import KPMediaQuestion from "./KPMediaQuestion";

describe("KPMediaQuestion", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPMediaQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
});
