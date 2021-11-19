import * as React from "react";
import { shallow } from "enzyme";
import KPTypingTemplate from "./KPTypingTemplate";

describe("KPTypingTemplate", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPTypingTemplate />);
    expect(wrapper).toMatchSnapshot();
  });
});
