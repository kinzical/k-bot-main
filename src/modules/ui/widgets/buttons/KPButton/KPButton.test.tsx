import * as React from "react";
import { shallow } from "enzyme";
import KPButton from "./KPButton";

describe("KPButton", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
