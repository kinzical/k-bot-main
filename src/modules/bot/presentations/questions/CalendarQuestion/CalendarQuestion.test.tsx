import * as React from "react";
import { shallow } from "enzyme";
import CalendarQuestion from "./CalendarQuestion";

describe("CalendarQuestion", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CalendarQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
});
