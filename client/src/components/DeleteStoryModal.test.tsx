/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import DeleteStoryModal from "./DeleteStoryModal";
import { DELETE_STORY } from "../graphql/mutations";
import { GET_STORIES } from "../graphql/queries";

// Use fake timers to simulate setTimeout for the 3-second delay
vi.useFakeTimers({ toFake: ["setTimeout"], shouldAdvanceTime: true });

describe("<DeleteStoryModal />", () => {
  const storyId = "story-123";
  const mockOnClose = vi.fn();
  const mockOnDeleted = vi.fn();

  const getStoriesMock: MockedResponse = {
    request: {
      query: GET_STORIES,
      variables: { limit: 6, offset: 0 },
    },
    result: {
      data: {
        getStories: [
          {
            _id: storyId,
            title: "Test Story",
            content: "Test content",
            likes: 0,
            author: { _id: "author-1", username: "AuthorUser" },
            comments: [],
            branches: [],
            parentStory: null,
          },
        ],
      },
    },
  };

  const deleteStoryMock: MockedResponse = {
    request: {
      query: DELETE_STORY,
      variables: { storyId },
    },
    result: {
      data: {
        deleteStory: {
          _id: storyId,
          title: "Test Story",
          __typename: "Story",
        },
      },
    },
  };

  const errorMock: MockedResponse = {
    request: {
      query: DELETE_STORY,
      variables: { storyId },
    },
    error: new Error("Failed to delete"),
  };

  const renderComponent = (mocks: MockedResponse[]) =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DeleteStoryModal
          storyId={storyId}
          onClose={mockOnClose}
          onDeleted={mockOnDeleted}
        />
      </MockedProvider>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("renders confirmation stage 1 with text and buttons", async () => {
    renderComponent([getStoriesMock]);

    expect(
      screen.getByText(/you're about to permanently erase a universe/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /yes, delete universe/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("transitions to final confirmation stage when confirmed", async () => {
    renderComponent([getStoriesMock]);
    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: /yes, delete universe/i })
      );
    });
    // Wait for final warning text to appear
    await screen.findByText(/this is the final warning/i);
  }, 10000);

  it("calls delete mutation and onDeleted after full confirmation", async () => {
    renderComponent([getStoriesMock, deleteStoryMock]);

    // Step 1: Advance to final confirmation stage
    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", { name: /yes, delete universe/i })
      );
    });

    // Wait for final stage to appear
    await screen.findByText(/this is the final warning/i);

    // Step 2: Click "Destroy"
    const destroyButton = screen
      .getAllByRole("button")
      .find((btn) => btn.textContent?.toLowerCase().includes("destroy"));
    expect(destroyButton).toBeDefined();

    await act(async () => {
      fireEvent.click(destroyButton!);
      await vi.advanceTimersByTimeAsync(3000); // Simulate the delay
    });

    // Step 3: Wait for final success message and assert
    await screen.findByText(/you just deleted a whole universe/i);

    expect(mockOnDeleted).toHaveBeenCalled();
  }, 15000);

  it("shows error if mutation fails", async () => {
    renderComponent([getStoriesMock, errorMock]);

    // Step 1: Confirm initial delete
    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", { name: /yes, delete universe/i })
      );
    });

    await screen.findByText(/this is the final warning/i);

    // Step 2: Click "Destroy"
    const destroyButton = screen
      .getAllByRole("button")
      .find((btn) => btn.textContent?.toLowerCase().includes("destroy"));
    expect(destroyButton).toBeDefined();

    // Step 3: Trigger mutation + simulate delay
    await act(async () => {
      fireEvent.click(destroyButton!);
      await vi.advanceTimersByTimeAsync(3000);
    });

    // Step 4: Check for error message
    await screen.findByText(/failed to delete/i);
  });
});
