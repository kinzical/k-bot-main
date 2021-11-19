import * as React from "react";
import { shallow } from "enzyme";
import EmailAnswer from "./EmailAnswer";

describe("EmailAnswer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<EmailAnswer />);
    expect(wrapper).toMatchSnapshot();
  });
});
