import * as React from "react";
import { shallow } from "enzyme";
import EmailQuestion from "./EmailQuestion";

describe("EmailQuestion", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<EmailQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
});
