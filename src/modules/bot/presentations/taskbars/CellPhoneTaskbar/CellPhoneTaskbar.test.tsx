import * as React from "react";
import { shallow } from "enzyme";
import CellPhoneTaskbar from "./CellPhoneTaskbar";

describe("CellPhoneTaskbar", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CellPhoneTaskbar />);
    expect(wrapper).toMatchSnapshot();
  });
});
