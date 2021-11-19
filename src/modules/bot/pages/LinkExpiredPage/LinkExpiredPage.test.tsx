import * as React from "react";
import { shallow } from "enzyme";
import LinkExpiredPage from "./LinkExpiredPage";

describe("LinkExpiredPage", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<LinkExpiredPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
