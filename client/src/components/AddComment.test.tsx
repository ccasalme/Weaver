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
    vi.useFakeTimers();
    vi.spyOn(globalThis, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
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
      request: { query: GET_STORIES },
      result: { data: { getStories: [] } },
    },
  ];

  it("submits a comment successfully", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddComment storyId={storyId} onClose={mockOnClose} />
      </MockedProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("Thread Title"), {
      target: { value: "My Thread Title" },
    });

    fireEvent.change(screen.getByPlaceholderText(/weave your story/i), {
      target: { value: "This is the content of the thread." },
    });

    fireEvent.click(screen.getByText(/submit thread/i));

    console.log("🧪 Submitted form");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(4000);
      console.log("🧪 Timers advanced");
    });

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  }, 15000);
});
