import { gql } from "@apollo/client";

// ✅ Create a new origin or thread
export const CREATE_STORY = gql`
  mutation createStory($title: String!, $content: String!) {
    createStory(title: $title, content: $content) {
      _id
      title
      content
      likes
      comments {
        _id
        content
      }
    }
  }
`;

// ✅ Branch a story
export const BRANCH_STORY = gql`
  mutation branchStory($storyId: ID!, $title: String!, $content: String!) {
    branchStory(storyId: $storyId, title: $title, content: $content) {
      _id
      title
      content
      branches {
        _id
        title
      }
    }
  }
`;

// ✅ Like or Save a story
export const LIKE_STORY = gql`
  mutation likeStory($storyId: ID!) {
    likeStory(storyId: $storyId) {
      _id
      likes
    }
  }
`;


// ✅ Follow another user
export const FOLLOW_USER = gql`
  mutation FollowUser($targetUserId: ID!) {
    followUser(targetUserId: $targetUserId) {
      _id
      username
    }
  }
`;

// ✅ Unfollow a user
export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($targetUserId: ID!) {
    unfollowUser(targetUserId: $targetUserId) {
      _id
      username
    }
  }
`;
