import * as React from "react";
import { shallow } from "enzyme";
import KPIconButton from "./KPIconButton";

describe("KPIconButton", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPIconButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
