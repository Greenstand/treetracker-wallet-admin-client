import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import WalletHeader from "./WalletHeader";

describe("WalletHeader", () => {
  const props = {
    title: "Wallet Title",
  };

  it("displays the correct title", () => {
    render(<WalletHeader {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
  });
});
