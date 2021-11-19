import * as React from "react";
import { shallow } from "enzyme";
import KPImage from "./KPImage";

describe("KPImage", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPImage />);
    expect(wrapper).toMatchSnapshot();
  });
});
