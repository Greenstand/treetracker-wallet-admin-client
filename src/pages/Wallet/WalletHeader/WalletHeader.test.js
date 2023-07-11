import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import WalletHeader from "./WalletHeader";

describe("WalletHeader", () => {
  const props = {
    title: "Wallet Title",
    pendingTransfers: 4,
  };

  it("displays the correct title", () => {
    render(<WalletHeader {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
  });

  it("displays the correct inner number", () => {
    render(<WalletInfoBlock {...props} />);
    expect(
      screen.getByText(props.pendingTransfers.toString()),
    ).toBeInTheDocument();
  });
});
