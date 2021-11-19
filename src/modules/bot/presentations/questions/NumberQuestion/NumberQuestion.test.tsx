import * as React from "react";
import { shallow } from "enzyme";
import NumberQuestion from "./NumberQuestion";

describe("NumberQuestion", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NumberQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
});
