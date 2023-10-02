import { mount } from "enzyme";
import React from "react";
import Layout from "./Layout";
import { StyledContent } from "./LayoutStyled";
import Menu from "./Menu/Menu";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  zIndex: {
    drawer: 1200,
  },
});

describe("Layout component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <div>Test</div>
          </Layout>
        </Router>
      </ThemeProvider>
    );
  });

  it("should render Layout component", () => {
    expect(wrapper).toBeTruthy();
  });

  it("should render Menu component", () => {
    expect(wrapper.find(Menu)).toHaveLength(1);
  });

  it("should render StyledContent component", () => {
    expect(wrapper.find(StyledContent)).toHaveLength(1);
  });
});
