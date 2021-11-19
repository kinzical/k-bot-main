import * as React from "react";
import { shallow } from "enzyme";
import CellPhoneQuestion from "./CellPhoneQuestion";

describe("CellPhoneQuestion", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CellPhoneQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
});
