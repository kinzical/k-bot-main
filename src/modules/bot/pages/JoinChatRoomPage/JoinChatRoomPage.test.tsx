import * as React from "react";
import { shallow } from "enzyme";
import JoinChatRoomPage from "./JoinChatRoomPage";

describe("JoinChatRoomPage", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<JoinChatRoomPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
