import React from "react";
import { shallow } from "enzyme";
import Layout from "./Layout";
import SideMenu from "./SideMenu/SideMenu";
import {
  StyledContent,
  StyledDrawer,
  StyledDrawerPaper,
  StyledRoot,
} from "./LayoutStyled";

describe("Layout component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Layout>
        <div>Test</div>
      </Layout>
    );
  });

  it("should render Layout component", () => {
    expect(wrapper).toBeTruthy();
  });

  it("should render SideMenu component", () => {
    expect(wrapper.find(SideMenu)).toHaveLength(1);
  });

  it("should render StyledRoot component", () => {
    expect(wrapper.find(StyledRoot)).toHaveLength(1);
  });

  it("should render StyledDrawer component", () => {
    expect(wrapper.find(StyledDrawer)).toHaveLength(1);
  });

  it("should render StyledDrawerPaper component", () => {
    expect(wrapper.find(StyledDrawerPaper)).toHaveLength(1);
  });

  it("should render StyledContent component", () => {
    expect(wrapper.find(StyledContent)).toHaveLength(1);
  });
});
