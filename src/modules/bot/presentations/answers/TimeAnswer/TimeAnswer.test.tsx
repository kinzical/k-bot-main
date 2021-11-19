import * as React from "react";
import { shallow } from "enzyme";
import TimeAnswer from "./TimeAnswer";

describe("TimeAnswer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TimeAnswer />);
    expect(wrapper).toMatchSnapshot();
  });
});
