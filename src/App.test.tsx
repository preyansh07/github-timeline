import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders generate timeline button", () => {
  render(<App />);
  const linkElement = screen.getByText(/generate timeline/i);
  expect(linkElement).toBeInTheDocument();
});
