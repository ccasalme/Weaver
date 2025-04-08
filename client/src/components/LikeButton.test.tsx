import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import LikeButton from "./LikeButton";
import { GET_MY_PROFILE } from "../graphql/queries";
import { vi } from "vitest";

// 🧪 Mock isLoggedIn to true so GET_MY_PROFILE will run
vi.mock("../utils/auth", () => ({
  isLoggedIn: () => true,
}));

const mocks = [
  {
    request: {
      query: GET_MY_PROFILE,
    },
    result: {
      data: {
        myProfile: {
          _id: "user-1",
          bio: "",
          avatar: "",
          user: {
            _id: "user-1",
            username: "testuser",
            email: "test@example.com",
            __typename: "User",
          },
          followers: [],
          sharedStories: [],
          likedStories: [],
          branchedStories: [],
          __typename: "Profile",
        },
      },
    },
  },
];

describe("<LikeButton />", () => {
  it("renders with initial like count and shows 'Like' label", () => {
    render(
      <MockedProvider mocks={mocks}>
        <LikeButton storyId="story-123" initialLikes={5} />
      </MockedProvider>
    );

    const button = screen.getByRole("button", { name: /like \(5\)/i });
    expect(button).toBeInTheDocument();
  });
});
