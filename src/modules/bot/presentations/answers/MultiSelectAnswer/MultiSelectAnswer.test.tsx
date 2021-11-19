import * as React from "react";
import { shallow } from "enzyme";
import MultiSelectAnswer from "./MultiSelectAnswer";

describe("MultiSelectAnswer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MultiSelectAnswer />);
    expect(wrapper).toMatchSnapshot();
  });
});
