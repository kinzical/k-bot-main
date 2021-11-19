import * as React from "react";
import { shallow } from "enzyme";
import KPInput from "./KPInput";

describe("KPInput", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPInput />);
    expect(wrapper).toMatchSnapshot();
  });
});
