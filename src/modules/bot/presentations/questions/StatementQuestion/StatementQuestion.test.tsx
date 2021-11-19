import * as React from "react";
import { shallow } from "enzyme";
import StatementQuestion from "./StatementQuestion";

describe("StatementQuestion", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<StatementQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
});
