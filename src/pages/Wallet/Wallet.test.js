import React from "react";
import { render, screen } from "@testing-library/react";
import Wallet from "./Wallet";
import apiClient from "../../utils/apiClient";

jest.mock("../../utils/apiClient", () => ({
  get: jest.fn(),
}));

describe("<Wallet />", () => {
  it("fetches and displays wallet data", async () => {
    apiClient.get.mockResolvedValueOnce({
      data: {
        id: "9d6c674f-ae62-4fab-8d14-ae5de9f14ab8",
        logo_url: "https://example.com/logo.png",
        tokens_in_wallet: 100,
        wallet: "test wallet",
      },
    });

    render(<Wallet />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await screen.findByText("Wallet test wallet");

    expect(screen.getByText("Wallet test wallet")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("tokens")).toBeInTheDocument();
  });

  it("displays error message on fetch failure", async () => {
    apiClient.get.mockImplementationOnce(() => Promise.reject("API error"));

    render(<Wallet />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await screen.findByRole("alert");

    expect(screen.getByRole("alert")).toHaveTextContent(
      "An error occurred while fetching wallet data."
    );
  });
});
