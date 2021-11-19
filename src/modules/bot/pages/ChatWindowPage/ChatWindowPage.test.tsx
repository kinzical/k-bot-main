import * as React from "react";
import { shallow } from "enzyme";
import ChatWindowPage from "./ChatWindowPage";

describe("ChatWindowPage", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ChatWindowPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
