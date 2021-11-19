import * as React from "react";
import { shallow } from "enzyme";
import JoinChatRoomContainer from "./JoinChatRoomContainer";

describe("JoinChatRoomContainer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<JoinChatRoomContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
