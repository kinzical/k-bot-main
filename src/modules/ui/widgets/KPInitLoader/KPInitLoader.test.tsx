import * as React from "react";
import { shallow } from "enzyme";
import KPInitLoader from "./KPInitLoader";

describe("KPInitLoader", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPInitLoader />);
    expect(wrapper).toMatchSnapshot();
  });
});
