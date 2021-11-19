import * as React from "react";
import { shallow } from "enzyme";
import ResponseSubmittedPage from "./ResponseSubmittedPage";

describe("ResponseSubmittedPage", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ResponseSubmittedPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
