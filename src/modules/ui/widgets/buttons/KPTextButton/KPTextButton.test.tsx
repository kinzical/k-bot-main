import * as React from "react";
import { shallow } from "enzyme";
import KPTextButton from "./KPTextButton";

describe("KPTextButton", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPTextButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
