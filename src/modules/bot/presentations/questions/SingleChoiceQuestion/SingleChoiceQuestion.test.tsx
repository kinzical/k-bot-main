import * as React from "react";
import { shallow } from "enzyme";
import SingleChoiceQuestion from "./SingleChoiceQuestion";

describe("SingleChoiceQuestion", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SingleChoiceQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
});
