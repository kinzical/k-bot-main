import * as React from "react";
import { shallow } from "enzyme";
import NumberTaskbar from "./NumberTaskbar";

describe("NumberTaskbar", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NumberTaskbar />);
    expect(wrapper).toMatchSnapshot();
  });
});
