import { render, screen, fireEvent, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import BranchStory from "./BranchStory";
import { BRANCH_STORY } from "../graphql/mutations";
import { GET_STORIES } from "../graphql/queries";
import * as authUtils from "../utils/auth"; // adjust path if needed

describe("<BranchStory />", () => {
  const parentStoryId = "story-abc-123";
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, "alert").mockImplementation(() => true);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const mocks = [
    {
      request: {
        query: BRANCH_STORY,
        variables: {
          storyId: parentStoryId,
          title: "New Branch Title",
          content: "This is the branch content.",
        },
      },
      result: {
        data: {
          branchStory: {
            _id: "branch-001",
            title: "New Branch Title",
            content: "This is the branch content.",
            parent: { _id: parentStoryId, __typename: "Story" },
            parentStory: null,
            author: {
              _id: "user-123",
              username: "Brancher",
              __typename: "User",
            },
            branches: [],
            __typename: "Story",
          },
        },
      },
    },
    {
      request: {
        query: GET_STORIES,
        variables: {},
      },
      result: {
        data: {
          getStories: [],
        },
      },
    },
  ];

  it("submits a new branch successfully", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BranchStory parentStoryId={parentStoryId} onClose={mockOnClose} />
      </MockedProvider>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("Branch Title"), {
      target: { value: "New Branch Title" },
    });

    fireEvent.change(screen.getByPlaceholderText(/what happens next/i), {
      target: { value: "This is the branch content." },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /submit branch/i }));

    // First 2-second timer: for the mutation delay
    await act(() => vi.advanceTimersByTimeAsync(2000));

    // Second 2-second timer: for the onClose delay
    await act(() => vi.advanceTimersByTimeAsync(2000));

    // Assert onClose was called
    expect(mockOnClose).toHaveBeenCalled();
  }, 10000);

  it("calls onClose when the ❎ Cancel button is clicked", async () => {
    vi.spyOn(authUtils, "isLoggedIn").mockResolvedValue(true);

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <BranchStory parentStoryId="story-abc-123" onClose={mockOnClose} />
      </MockedProvider>
    );

    // Wait for auth check
    await act(() => Promise.resolve());

    // Find the ❎ Cancel button and click it
    const cancelButton = screen.getByText((text) =>
      text.toLowerCase().includes("cancel")
    );
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
