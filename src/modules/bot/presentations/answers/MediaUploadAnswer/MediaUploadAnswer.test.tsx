import * as React from "react";
import { shallow } from "enzyme";
import MediaUploadAnswer from "./MediaUploadAnswer";

describe("MediaUploadAnswer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MediaUploadAnswer />);
    expect(wrapper).toMatchSnapshot();
  });
});
