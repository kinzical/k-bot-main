import * as React from "react";
import { shallow } from "enzyme";
import KPFileMediaUpload from "./KPFileMediaUpload";

describe("KPFileMediaUpload", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPFileMediaUpload />);
    expect(wrapper).toMatchSnapshot();
  });
});
