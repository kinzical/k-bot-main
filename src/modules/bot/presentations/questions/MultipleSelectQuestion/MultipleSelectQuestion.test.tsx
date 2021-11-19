import * as React from "react";
import { shallow } from "enzyme";
import MultipleSelectQuestion from "./MultipleSelectQuestion";

describe("MultipleSelectQuestion", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MultipleSelectQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
});
