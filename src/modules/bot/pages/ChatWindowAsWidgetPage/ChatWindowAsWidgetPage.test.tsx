import * as React from "react";
import { shallow } from "enzyme";
import ChatWindowAsWidgetPage from "./ChatWindowAsWidgetPage";

describe("ChatWindowAsWidgetPage", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ChatWindowAsWidgetPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
