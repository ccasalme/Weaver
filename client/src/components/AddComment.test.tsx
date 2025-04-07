// src/components/AddComment.test.tsx
/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import AddComment from "./AddComment";
import { ADD_COMMENT } from "../graphql/mutations";

describe("<AddComment />", () => {
  const storyId = "test-story-123";
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, "alert").mockImplementation(() => {});
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

    await act(() => {
      fireEvent.click(screen.getByText(/submit thread/i));
    });

    await act(() => vi.advanceTimersByTimeAsync(2000));
    await act(() => vi.advanceTimersByTimeAsync(2000));

    let attempts = 0;
    while (!mockOnClose.mock.calls.length && attempts < 10) {
      await act(() => vi.advanceTimersByTimeAsync(100));
      attempts++;
    }

    expect(mockOnClose).toHaveBeenCalled();
  }, 10000);

  it("renders the input fields and submit button", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AddComment storyId="123" onClose={vi.fn()} />
      </MockedProvider>
    );

    expect(screen.getByPlaceholderText("Thread Title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/weave your story/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/submit thread/i)).toBeInTheDocument();
  });

  it("closes the modal when the backdrop is clicked", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AddComment storyId="123" onClose={mockOnClose} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByText(/cancel/i));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
