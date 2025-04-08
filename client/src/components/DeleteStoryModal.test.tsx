// DeleteStoryModal.basic.test.tsx
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import DeleteStoryModal from "./DeleteStoryModal";
import { vi } from "vitest";

describe("<DeleteStoryModal /> Basic Render", () => {
  it("renders without crashing and shows the initial heading and confirmation text", () => {
    const mockStoryId = "abc123";
    const mockOnClose = vi.fn();
    const mockOnDeleted = vi.fn();

    render(
      <MockedProvider>
        <DeleteStoryModal
          storyId={mockStoryId}
          onClose={mockOnClose}
          onDeleted={mockOnDeleted}
        />
      </MockedProvider>
    );

    // Verify the modal heading is shown
    expect(
      screen.getByRole("heading", { name: /delete origin universe/i })
    ).toBeInTheDocument();

    // ✅ Use getAllByText for duplicated content
    const warningMessages = screen.getAllByText(
      /permanently erase a universe/i
    );
    expect(warningMessages.length).toBeGreaterThan(0);

    // Confirm the stage 1 buttons are present
    expect(
      screen.getAllByRole("button", { name: /yes, delete universe/i })[0]
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole("button", { name: /cancel/i })[0]
    ).toBeInTheDocument();
  });
});
