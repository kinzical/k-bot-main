import * as React from "react";
import { shallow } from "enzyme";
import KPAudioPlayer from "./KPAudioPlayer";

describe("KPAudioPlayer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPAudioPlayer />);
    expect(wrapper).toMatchSnapshot();
  });
});
