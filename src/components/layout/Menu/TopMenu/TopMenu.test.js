import { shallow } from "enzyme";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBarStyled, LogoStyled } from "./TopMenuStyled";
import TopMenu from "./TopMenu";

describe("TopMenu component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <TopMenu>
        <div>Test</div>
      </TopMenu>
    );
  });

  it("should render TopMenu component", () => {
    expect(wrapper).toBeTruthy();
  });

  it("should render AppBarStyled component", () => {
    expect(wrapper.find(AppBarStyled)).toHaveLength(1);
  });

  it("should render LogoStyled component", () => {
    expect(wrapper.find(LogoStyled)).toHaveLength(1);
  });

  it("should render LogoutIcon component", () => {
    expect(wrapper.find(LogoutIcon)).toHaveLength(1);
  });
});
