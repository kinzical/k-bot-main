import * as React from "react";
import { shallow } from "enzyme";
import HeaderContainer from "./HeaderContainer";

describe("HeaderContainer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<HeaderContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
