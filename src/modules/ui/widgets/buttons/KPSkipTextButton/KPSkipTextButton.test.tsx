import * as React from "react";
import { shallow } from "enzyme";
import KPSkipTextButton from "./KPSkipTextButton";

describe("KPSkipTextButton", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPSkipTextButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
