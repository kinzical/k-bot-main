import * as React from "react";
import { shallow } from "enzyme";
import CellphoneAnswer from "./CellphoneAnswer";

describe("CellphoneAnswer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CellphoneAnswer />);
    expect(wrapper).toMatchSnapshot();
  });
});
