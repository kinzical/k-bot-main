import * as React from "react";
import { shallow } from "enzyme";
import Answer from "./Answer";

describe("Answer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Answer />);
    expect(wrapper).toMatchSnapshot();
  });
});
