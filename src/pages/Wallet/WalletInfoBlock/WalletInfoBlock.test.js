import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WalletInfoBlock from "./WalletInfoBlock";

describe("WalletInfoBlock", () => {
  const props = {
    title: "Wallet Title",
    innerNumber: 123,
    innerText: "Wallet Text",
  };

  it("displays the correct title", () => {
    render(<WalletInfoBlock {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
  });

  it("displays the correct inner number", () => {
    render(<WalletInfoBlock {...props} />);
    expect(screen.getByText(props.innerNumber.toString())).toBeInTheDocument();
  });

  it("displays the correct inner text", () => {
    render(<WalletInfoBlock {...props} />);
    expect(screen.getByText(props.innerText)).toBeInTheDocument();
  });
});
