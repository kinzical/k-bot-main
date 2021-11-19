import * as React from "react";
import { shallow } from "enzyme";
import RatingAnswer from "./RatingAnswer";

describe("RatingAnswer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<RatingAnswer />);
    expect(wrapper).toMatchSnapshot();
  });
});
