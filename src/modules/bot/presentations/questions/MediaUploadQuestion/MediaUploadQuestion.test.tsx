import * as React from "react";
import { shallow } from "enzyme";
import MediaUploadQuestion from "./MediaUploadQuestion";

describe("MediaUploadQuestion", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MediaUploadQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
});
