import * as React from "react";
import { shallow } from "enzyme";
import TimeQuestion from "./TimeQuestion";

describe("TimeQuestion", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TimeQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
});
