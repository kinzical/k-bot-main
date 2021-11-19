import * as React from "react";
import { shallow } from "enzyme";
import KPNumberInput from "./KPNumberInput";

describe("KPNumberInput", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPNumberInput />);
    expect(wrapper).toMatchSnapshot();
  });
});
