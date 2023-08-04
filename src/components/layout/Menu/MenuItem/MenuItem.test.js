import { shallow } from "enzyme";
import React from "react";
import MenuItem from "./MenuItem";
import {
  ItemButtonStyled,
  ItemIconStyled,
  LinkItemStyled,
} from "./MenuItemStyled";

describe("Layout component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MenuItem>
        <div>Test</div>
      </MenuItem>
    );
  });

  it("should render Layout component", () => {
    expect(wrapper).toBeTruthy();
  });

  it("should render ItemButtonStyled component", () => {
    const itemButtons = wrapper.find(ItemButtonStyled);
    expect(itemButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("should render ItemIconStyled component", () => {
    const itemIcons = wrapper.find(ItemIconStyled);
    expect(itemIcons.length).toBeGreaterThanOrEqual(1);
  });

  it("should render LinkItemStyled component", () => {
    const linkItems = wrapper.find(LinkItemStyled);
    expect(linkItems.length).toBeGreaterThanOrEqual(1);
  });
});
