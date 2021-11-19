import * as React from "react";
import { shallow } from "enzyme";
import KPSubmitButton from "./KPSubmitButton";

describe("KPSubmitButton", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPSubmitButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
