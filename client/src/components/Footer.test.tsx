/// <reference types="vitest" />
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("<Footer />", () => {
  it("renders without crashing", () => {
    render(<Footer />);
    const footerElement = screen.getByText(/© 2025 Weaver/i);
    expect(footerElement).toBeInTheDocument();
  });

  it("contains the expected text", () => {
    render(<Footer />);
    expect(
      screen.getByText(/Cyrl Casalme, Stella Nabajja, Corey Parsons/i)
    ).toBeInTheDocument();
  });

  it("has the footer class for CSS styling", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo"); // This is the semantic role for <footer>
    expect(footer).toHaveClass("footer");
  });
});
