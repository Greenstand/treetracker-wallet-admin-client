// generate tests for SideMenu component using Jest and without Enzyme

import React from "react";
import ReactDOM from "react-dom";
import SideMenu from "./SideMenu";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SideMenu />, div);
});
