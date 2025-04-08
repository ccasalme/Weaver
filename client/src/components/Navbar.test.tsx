// src/components/Navbar.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import { GET_ME } from "../graphql/queries";

describe("<Navbar /> Basic Render", () => {
  it("renders navigation and login/join buttons when logged out", async () => {
    render(
      <MockedProvider
        mocks={[{ request: { query: GET_ME }, result: { data: { me: null } } }]}
        addTypename={false}
      >
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </MockedProvider>
    );

    // Grab the hamburger div directly (no getByClass)
    const hamburger = document.querySelector(".hamburger");
    expect(hamburger).toBeInTheDocument();

    // Simulate click to open the menu
    fireEvent.click(hamburger!);

    // Now check if the menu items are visible
    expect(await screen.findByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/what is weaver/i)).toBeInTheDocument();
    expect(screen.getByText(/rules and guidelines/i)).toBeInTheDocument();
    expect(screen.getByText(/about the architects/i)).toBeInTheDocument();
    expect(screen.getByText(/privacy policy/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /join us/i })
    ).toBeInTheDocument();
  });
});
