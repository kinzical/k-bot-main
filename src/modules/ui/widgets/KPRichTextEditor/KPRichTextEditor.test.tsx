import * as React from "react";
import { shallow } from "enzyme";
import KPRichTextEditor from "./KPRichTextEditor";

describe("KPRichTextEditor", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KPRichTextEditor />);
    expect(wrapper).toMatchSnapshot();
  });
});
