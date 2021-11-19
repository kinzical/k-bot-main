import * as React from "react";
import { shallow } from "enzyme";
import KPMediaUpload from "./KPMediaUpload";

describe("KPMediaUpload", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPMediaUpload />);
    expect(wrapper).toMatchSnapshot();
  });
});
