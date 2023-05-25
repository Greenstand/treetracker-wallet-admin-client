import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("App component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the Router component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("BrowserRouter")).toHaveLength(1);
  });

  it("renders the Layout component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Layout")).toHaveLength(1);
  });

  it("renders the ClientRoutes component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("ClientRoutes")).toHaveLength(1);
  });
});
