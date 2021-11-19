import * as React from "react";
import { shallow } from "enzyme";
import MultiLineTextAnswer from "./MultiLineTextAnswer";

describe("MultiLineTextAnswer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MultiLineTextAnswer />);
    expect(wrapper).toMatchSnapshot();
  });
});
