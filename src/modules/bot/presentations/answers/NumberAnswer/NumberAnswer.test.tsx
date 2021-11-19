import * as React from "react";
import { shallow } from "enzyme";
import NumberAnswer from "./NumberAnswer";

describe("NumberAnswer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NumberAnswer />);
    expect(wrapper).toMatchSnapshot();
  });
});
