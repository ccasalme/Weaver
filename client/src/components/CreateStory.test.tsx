/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import CreateStory from "./CreateStory";
import { CREATE_STORY } from "../graphql/mutations";
import { GET_STORIES, GET_MY_PROFILE, GET_PROMPTS } from "../graphql/queries";

// Mock confetti since we don't want it running in tests
vi.mock("canvas-confetti", () => ({
  default: vi.fn(),
}));

// Stub for isLoggedIn to avoid actual auth logic in test
vi.mock("../utils/auth", () => ({
  isLoggedIn: () => Promise.resolve(true),
}));

describe("<CreateStory />", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const mocks = [
    {
      request: {
        query: GET_PROMPTS,
      },
      result: {
        data: {
          getPrompts: [], // return empty array or mock a few prompts if needed
        },
      },
    },
    {
      request: {
        query: CREATE_STORY,
        variables: {
          title: "My Story Title",
          content: "This is my story content.",
        },
      },
      result: {
        data: {
          createStory: {
            _id: "story-123",
            title: "My Story Title",
            content: "This is my story content.",
            likes: 0, // ✅ important if your cache expects it
            __typename: "Story",
          },
        },
      },
    },
    // Mock for GET_STORIES and GET_MY_PROFILE queries
    {
      request: {
        query: GET_STORIES,
        variables: {}, // Apollo expects this match
      },
      result: {
        data: {
          getStories: [], // just returning an empty list works for now
        },
      },
    },
    {
      request: {
        query: GET_MY_PROFILE,
        variables: {}, // optional if query has no required vars
      },
      result: {
        data: {
          myProfile: {
            _id: "user-123",
            bio: "Sample bio",
            avatar: "avatar.png",
            user: {
              _id: "user-123",
              username: "TestUser",
              email: "test@example.com",
              __typename: "User",
            },
            followers: [],
            sharedStories: [],
            likedStories: [],
            branchedStories: [],
            __typename: "UserProfile",
          },
        },
      },
    },
  ];

  it("renders form inputs and buttons", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateStory onClose={mockOnClose} />
      </MockedProvider>
    );

    expect(screen.getByPlaceholderText("Origin Title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/start weaving your origin/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit origin/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /suggest prompt/i })
    ).toBeInTheDocument();
  });

  it("submits a story successfully", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateStory onClose={mockOnClose} />
      </MockedProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("Origin Title"), {
      target: { value: "My Story Title" },
    });
    fireEvent.change(
      screen.getByPlaceholderText(/start weaving your origin/i),
      {
        target: { value: "This is my story content." },
      }
    );

    fireEvent.click(screen.getByRole("button", { name: /submit origin/i }));

    // First timeout for mutation
    await act(() => vi.advanceTimersByTimeAsync(2000));

    // Second timeout for success + onClose
    await act(() => vi.advanceTimersByTimeAsync(2000));

    // Poll until mockOnClose is called
    let attempts = 0;
    while (!mockOnClose.mock.calls.length && attempts < 10) {
      await act(() => vi.advanceTimersByTimeAsync(100));
      attempts++;
    }

    expect(mockOnClose).toHaveBeenCalled();
  }, 10000);
});
