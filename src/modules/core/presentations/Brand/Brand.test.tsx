import * as React from "react";
import { shallow } from "enzyme";
import Brand from "./Brand";

describe("Brand", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Brand />);
    expect(wrapper).toMatchSnapshot();
  });
});
