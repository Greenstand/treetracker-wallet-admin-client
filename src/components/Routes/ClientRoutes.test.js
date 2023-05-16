import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import ClientRoutes from "./ClientRoutes";
import Wallet from "../../pages/Wallet/Wallet";
import TransferStatus from "../../pages/TransferStatus/TransferStatus";

describe("ClientRoutes component", () => {
  it("should render Wallet component when on '/' route", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <ClientRoutes />
      </MemoryRouter>
    );

    expect(wrapper.find(Wallet)).toHaveLength(1);
  });

  it("should render TransferStatus component when on '/transfer-status' route", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/transfer-status"]}>
        <ClientRoutes />
      </MemoryRouter>
    );

    expect(wrapper.find(TransferStatus)).toHaveLength(1);
  });
});
