import * as React from "react";
import { shallow } from "enzyme";
import SingleLineTextQuestion from "./SingleLineTextQuestion";

describe("SingleLineTextQuestion", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SingleLineTextQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
});
