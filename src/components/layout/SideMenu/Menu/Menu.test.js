import React from "react";
import { shallow } from "enzyme";
import Menu from "./Menu";
import MenuItem from "./MenuItem/MenuItem";
import MenuContext from "../../../../store/menu-context";

describe("Menu component", () => {
  const defaultProps = {
    isMenuCollapsed: false,
  };

  const renderWithContext = (value) => {
    return shallow(
      <MenuContext.Provider value={value}>
        <Menu />
      </MenuContext.Provider>
    )
      .find(Menu)
      .dive();
  };

  it("renders without crashing", () => {
    const view = renderWithContext(defaultProps);
    expect(JSON.stringify(view)).toMatchSnapshot();
  });

  it("renders two MenuItem components", () => {
    const view = renderWithContext(defaultProps);
    expect(view.find(MenuItem)).toHaveLength(2);
  });

  it("renders Home MenuItem correctly", () => {
    const view = renderWithContext(defaultProps);
    const homeMenuItem = view.find(MenuItem).at(0);
    expect(homeMenuItem.prop("linkTo")).toEqual("/");
    expect(homeMenuItem.prop("text")).toEqual("Home");
    expect(homeMenuItem.prop("iconsOnly")).toBe(defaultProps.isMenuCollapsed);
  });

  it("renders Transfer Status MenuItem correctly", () => {
    const view = renderWithContext(defaultProps);
    const transferStatusMenuItem = view.find(MenuItem).at(1);
    expect(transferStatusMenuItem.prop("linkTo")).toEqual("/transfer-status");
    expect(transferStatusMenuItem.prop("text")).toEqual("Transfer Status");
    expect(transferStatusMenuItem.prop("iconsOnly")).toBe(
      defaultProps.isMenuCollapsed
    );
  });
});
