import * as React from "react";
import { shallow } from "enzyme";
import CalendarAnswer from "./CalendarAnswer";

describe("CalendarAnswer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CalendarAnswer />);
    expect(wrapper).toMatchSnapshot();
  });
});
