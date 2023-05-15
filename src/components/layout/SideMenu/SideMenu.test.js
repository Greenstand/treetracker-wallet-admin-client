import React from "react";
import { shallow } from "enzyme";
import SideMenu from "./SideMenu";
import Menu from "./Menu/Menu";
import MenuContext from "../../../store/menu-context";

describe("SideMenu component", () => {
  let menuCtx;
  const renderWithContext = (menuCtx) => {
    return shallow(
      <MenuContext.Provider value={menuCtx}>
        <SideMenu>
          <div>Test</div>
        </SideMenu>
      </MenuContext.Provider>
    )
      .find(SideMenu)
      .dive();
  };

  beforeEach(() => {
    menuCtx = {
      isMenuCollapsed: false,
      onMenuToggle: jest.fn(),
    };
  });

  it("should render SideMenu component", () => {
    const view = renderWithContext(menuCtx);
    expect(view).toBeTruthy();
  });

  it("should render Menu component", () => {
    const view = renderWithContext(menuCtx);
    expect(view.find(Menu)).toHaveLength(1);
  });
});
