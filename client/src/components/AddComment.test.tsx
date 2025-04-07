// src/components/AddComment.test.tsx
/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import AddComment from "./AddComment";
import { ADD_COMMENT } from "../graphql/mutations";
import { GET_STORIES } from "../graphql/queries";

describe("<AddComment />", () => {
  const storyId = "test-story-123";
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers(); // fake time for setTimeouts
    vi.spyOn(globalThis, "alert").mockImplementation(() => {}); // silence alerts
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  const mocks = [
    {
      request: {
        query: ADD_COMMENT,
        variables: {
          storyId,
          content: "**My Thread Title**\n\nThis is the content of the thread.",
        },
      },
      result: {
        data: {
          addComment: {
            _id: "comment-id-123",
            content:
              "**My Thread Title**\n\nThis is the content of the thread.",
            storyId,
            author: {
              _id: "user-123",
              username: "TestUser",
              __typename: "User",
            },
            __typename: "Comment",
          },
        },
      },
    },
    {
      request: {
        query: GET_STORIES,
      },
      result: {
        data: {
          getStories: [],
        },
      },
    },
  ];

  it("submits a comment successfully", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddComment storyId={storyId} onClose={mockOnClose} />
      </MockedProvider>
    );

    // Fill in form
    fireEvent.change(screen.getByPlaceholderText("Thread Title"), {
      target: { value: "My Thread Title" },
    });

    fireEvent.change(screen.getByPlaceholderText(/weave your story/i), {
      target: { value: "This is the content of the thread." },
    });

    fireEvent.click(screen.getByText(/submit thread/i));

    // 🧪 Advance time for 1st 2s timeout (ripple) and 2nd 2s timeout (onClose)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(4000);
    });

    // ✅ Wait for the onClose callback to be called
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  }, 15000); // extend timeout in case delay sim is slow
});
