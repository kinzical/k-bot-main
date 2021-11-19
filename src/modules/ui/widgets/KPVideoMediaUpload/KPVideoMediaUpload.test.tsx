import * as React from "react";
import { shallow } from "enzyme";
import KPVideoMediaUpload from "./KPVideoMediaUpload";

describe("KPVideoMediaUpload", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPVideoMediaUpload />);
    expect(wrapper).toMatchSnapshot();
  });
});
