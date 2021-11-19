import * as React from "react";
import { shallow } from "enzyme";
import KPSendButton from "./KPSendButton";

describe("KPSendButton", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPSendButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
