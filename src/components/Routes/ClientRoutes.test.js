import React from "react";
import { shallow } from "enzyme";
import { useContext } from "react";
import ClientRoutes from "./ClientRoutes";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

jest.mock("../../utils/apiClient", () => ({
  get: jest.fn(),
}));

describe("ClientRoutes component", () => {
  beforeEach(() => {
    useContext.mockReset();
  });

  it("renders without crashing", () => {
    useContext.mockReturnValueOnce({
      isLoggedIn: true,
    });

    const wrapper = shallow(<ClientRoutes />);
    expect(wrapper.exists()).toBe(true);
  });
});
