import * as React from "react";
import { shallow } from "enzyme";
import KPAudioMediaUpload from "./KPAudioMediaUpload";

describe("KPAudioMediaUpload", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPAudioMediaUpload />);
    expect(wrapper).toMatchSnapshot();
  });
});
