import React from "react";
import { shallow } from "enzyme";
import { CircularProgress } from "@mui/material";
import { LoaderGrid } from "./LoaderStyled";
import { Loader } from "./Loader";

describe("Loader component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the LoaderGrid component", () => {
    const wrapper = shallow(<Loader />);
    const loaderGridComponent = wrapper.find(LoaderGrid);
    expect(loaderGridComponent).toHaveLength(1);
  });

  it("renders the CircularProgress component", () => {
    const wrapper = shallow(<Loader />);
    const circularProgressComponent = wrapper.find(CircularProgress);
    expect(circularProgressComponent).toHaveLength(1);
  });
});
