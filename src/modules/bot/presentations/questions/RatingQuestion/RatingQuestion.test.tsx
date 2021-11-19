import * as React from "react";
import { shallow } from "enzyme";
import RatingQuestion from "./RatingQuestion";

describe("RatingQuestion", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<RatingQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
});
