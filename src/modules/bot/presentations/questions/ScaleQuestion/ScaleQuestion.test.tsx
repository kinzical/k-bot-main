import * as React from "react";
import { shallow } from "enzyme";
import ScaleQuestion from "./ScaleQuestion";

describe("ScaleQuestion", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ScaleQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
});
