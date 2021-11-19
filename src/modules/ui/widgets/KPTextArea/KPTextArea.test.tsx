import * as React from "react";
import { shallow } from "enzyme";
import KPTextArea from "./KPTextArea";

describe("KPTextArea", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPTextArea />);
    expect(wrapper).toMatchSnapshot();
  });
});
