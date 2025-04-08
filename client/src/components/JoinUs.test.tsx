import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import JoinUs from "./JoinUs";

describe("<JoinUs /> Basic Render", () => {
  it("renders the signup modal with form inputs and buttons", () => {
    const mockOnClose = vi.fn();
    const mockSwitchToLogin = vi.fn();

    render(
      <MockedProvider>
        <JoinUs onClose={mockOnClose} switchToLogin={mockSwitchToLogin} />
      </MockedProvider>
    );

    // Heading
    expect(
      screen.getByRole("heading", { name: /join weaver/i })
    ).toBeInTheDocument();

    // Inputs
    expect(
      screen.getByPlaceholderText("Full Name (First and Last)")
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Re-enter Password")
    ).toBeInTheDocument();

    // Buttons
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /log in here/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });
});
