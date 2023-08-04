import { shallow } from "enzyme";
import React from "react";
import Menu from "./Menu";
import MenuItem from "./MenuItem/MenuItem";
import { DrawerHeaderStyled, DrawerStyled } from "./MenuStyled";

describe("Menu component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Menu>
        <div>Test</div>
      </Menu>
    );
  });

  it("should render Menu component", () => {
    expect(wrapper).toBeTruthy();
  });

  it("should render MenuItem component", () => {
    expect(wrapper.find(MenuItem)).toHaveLength(1);
  });

  it("should render DrawerHeaderStyled component", () => {
    expect(wrapper.find(DrawerHeaderStyled)).toHaveLength(1);
  });

  it("should render DrawerStyled component", () => {
    expect(wrapper.find(DrawerStyled)).toHaveLength(1);
  });
});
