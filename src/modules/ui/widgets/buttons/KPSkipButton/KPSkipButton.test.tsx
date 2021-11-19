import * as React from "react";
import { shallow } from "enzyme";
import KPSkipButton from "./KPSkipButton";

describe("KPSkipButton", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPSkipButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
