import * as React from "react";
import { shallow } from "enzyme";
import SingleLineTextAnswer from "./SingleLineTextAnswer";

describe("SingleLineTextAnswer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SingleLineTextAnswer />);
    expect(wrapper).toMatchSnapshot();
  });
});
