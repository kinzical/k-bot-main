import * as React from "react";
import { shallow } from "enzyme";
import KPTimeTemplate from "./KPTimeTemplate";

describe("KPTimeTemplate", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPTimeTemplate />);
    expect(wrapper).toMatchSnapshot();
  });
});
