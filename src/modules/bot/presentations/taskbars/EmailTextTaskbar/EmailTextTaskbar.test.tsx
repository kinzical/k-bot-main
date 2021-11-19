import * as React from "react";
import { shallow } from "enzyme";
import EmailTextTaskbar from "./EmailTextTaskbar";

describe("EmailTextTaskbar", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<EmailTextTaskbar />);
    expect(wrapper).toMatchSnapshot();
  });
});
