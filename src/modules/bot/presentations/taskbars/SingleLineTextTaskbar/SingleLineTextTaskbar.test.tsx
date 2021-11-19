import * as React from "react";
import { shallow } from "enzyme";
import SingleLineTextTaskbar from "./SingleLineTextTaskbar";

describe("SingleLineTextTaskbar", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SingleLineTextTaskbar />);
    expect(wrapper).toMatchSnapshot();
  });
});
