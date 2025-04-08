import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Login from "./Login";
import { vi } from "vitest";

// Mock props
const mockOnClose = vi.fn();
const mockSwitchToJoinUs = vi.fn();

describe("<Login /> Basic Render", () => {
  it("renders the login modal with form inputs and buttons", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Login onClose={mockOnClose} switchToJoinUs={mockSwitchToJoinUs} />
      </MockedProvider>
    );

    // Basic checks
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByText(/don’t have an account/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /join us here/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });
});
