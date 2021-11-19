import * as React from "react";
import { shallow } from "enzyme";
import MultiLineTextTaskbar from "./MultiLineTextTaskbar";

describe("MultiLineTextTaskbar", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MultiLineTextTaskbar />);
    expect(wrapper).toMatchSnapshot();
  });
});
