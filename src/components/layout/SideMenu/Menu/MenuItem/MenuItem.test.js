import React from "react";
import { shallow } from "enzyme";
import MenuItem from "./MenuItem";
import {
  StyledListItemText,
  LinkItemText,
  StyledListItemIcon,
  StyledMenuItem,
} from "./MenuItemStyled";

describe("MenuItem component", () => {
  it("should render correctly with props", () => {
    const wrapper = shallow(
      <MenuItem icon={<div />} linkTo="/home" iconsOnly={false} text="Home" />
    );
    expect(wrapper.find(StyledMenuItem)).toHaveLength(1);
    expect(wrapper.find(StyledListItemIcon)).toHaveLength(1);
    expect(wrapper.find(StyledListItemText)).toHaveLength(1);
    expect(wrapper.find(LinkItemText)).toHaveLength(1);
    expect(wrapper.find({ to: "/home" })).toHaveLength(1);
    expect(wrapper.find({ primary: "Home" })).toHaveLength(1);
  });

  it("should render without StyledListItemText when iconsOnly is true", () => {
    const wrapper = shallow(
      <MenuItem icon={<div />} linkTo="/home" iconsOnly={true} text="Home" />
    );
    expect(wrapper.find(StyledMenuItem)).toHaveLength(1);
    expect(wrapper.find(StyledListItemIcon)).toHaveLength(1);
    expect(wrapper.find(StyledListItemText)).toHaveLength(0);
    expect(wrapper.find(LinkItemText)).toHaveLength(1);
    expect(wrapper.find({ to: "/home" })).toHaveLength(1);
    expect(wrapper.find({ primary: "Home" })).toHaveLength(0);
  });

  it("should apply active class when link is active", () => {
    const wrapper = shallow(
      <MenuItem icon={<div />} linkTo="/home" iconsOnly={false} text="Home" />
    );
    expect(
      wrapper.find(LinkItemText).prop("className")({ isActive: true })
    ).toEqual("active");
    expect(
      wrapper.find(LinkItemText).prop("className")({ isActive: false })
    ).toEqual("");
  });
});
