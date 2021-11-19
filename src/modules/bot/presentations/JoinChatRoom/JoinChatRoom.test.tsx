import * as React from "react";
import { shallow } from "enzyme";
import JoinChatRoom from "./JoinChatRoom";

describe("JoinChatRoom", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<JoinChatRoom />);
    expect(wrapper).toMatchSnapshot();
  });
});
