import React, { useContext } from "react";
import { shallow } from "enzyme";
import { TextField } from "@mui/material";
import Login from "./Login";

jest.mock("../../utils/apiClient", () => ({
  get: jest.fn(),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

describe("Login component", () => {
  beforeEach(() => {
    useContext.mockReset();

    useContext.mockReturnValueOnce({
      isLoggedIn: false,
    });
  });

  it("renders without crashing", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the wallet and password input fields", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(TextField).length).toBe(2);
    expect(wrapper.find(TextField).at(0).props().name).toBe("wallet");
    expect(wrapper.find(TextField).at(1).props().name).toBe("password");
  });
});
