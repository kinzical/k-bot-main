import * as React from "react";
import { shallow } from "enzyme";
import ScaleAnswer from "./ScaleAnswer";

describe("ScaleAnswer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ScaleAnswer />);
    expect(wrapper).toMatchSnapshot();
  });
});
