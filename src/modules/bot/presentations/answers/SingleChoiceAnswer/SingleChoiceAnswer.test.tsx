import * as React from "react";
import { shallow } from "enzyme";
import SingleChoiceAnswer from "./SingleChoiceAnswer";

describe("SingleChoiceAnswer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SingleChoiceAnswer />);
    expect(wrapper).toMatchSnapshot();
  });
});
