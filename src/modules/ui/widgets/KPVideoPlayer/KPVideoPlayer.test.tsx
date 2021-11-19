import * as React from "react";
import { shallow } from "enzyme";
import KPVideoPlayer from "./KPVideoPlayer";

describe("KPVideoPlayer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPVideoPlayer />);
    expect(wrapper).toMatchSnapshot();
  });
});
