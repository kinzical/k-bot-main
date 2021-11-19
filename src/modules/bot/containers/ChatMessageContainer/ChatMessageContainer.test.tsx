import * as React from "react";
import { shallow } from "enzyme";
import ChatMessageContainer from "./ChatMessageContainer";

describe("ChatMessageContainer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ChatMessageContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
