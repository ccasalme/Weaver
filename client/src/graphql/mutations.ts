// src/graphql/mutations.ts
import { gql } from "@apollo/client";

// ✅ Login mutation
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// ✅ Register a new user (AddUser)
export const ADD_USER = gql`
  mutation addUser(
    $fullName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      fullName: $fullName
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// ✅ Create a new story (origin/thread) — returns basic fields to avoid null crash
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

// ✅ Branch a story — use defensive querying
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
      parentStory {
        _id
        title
      }
    }
  }
`;

// ✅ Like a story — basic return avoids error if nested story fields are missing
export const LIKE_STORY = gql`
  mutation likeStory($storyId: ID!) {
    likeStory(storyId: $storyId) {
      _id
      likes
    }
  }
`;

// ✅ Add a comment — only return what's needed
export const ADD_COMMENT = gql`
  mutation addComment($storyId: ID!, $content: String!) {
    addComment(storyId: $storyId, content: $content) {
      _id
      content
      author {
        _id
        username 
      }
    }
  }
`;

// ✅ Delete a story — returns just the essentials
export const DELETE_STORY = gql`
  mutation deleteStory($storyId: ID!) {
    deleteStory(storyId: $storyId) {
      _id
      title
    }
  }
`;

// ✅ Vote on a story — no unnecessary nesting
export const VOTE_STORY = gql`
  mutation voteStory($storyId: ID!, $voteType: VoteType) {
    voteStory(storyId: $storyId, voteType: $voteType) {
      _id
      voteType
      user {
        _id
        username
      }
    }
  }
`;

// ✅ Update profile — defensively returns minimal fields
export const UPDATE_PROFILE = gql`
  mutation updateProfile($bio: String, $avatar: String) {
    updateProfile(bio: $bio, avatar: $avatar) {
      _id
      bio
      avatar
      user {
        _id
        username
      }
      followers {
        _id
        username
      }
    }
  }
`;

// ✅ Follow another user — return minimal user info
export const FOLLOW_USER = gql`
  mutation followUser($targetUserId: ID!) {
    followUser(targetUserId: $targetUserId) {
      _id
      username
    }
  }
`;

// ✅ Unfollow a user — same structure as follow
export const UNFOLLOW_USER = gql`
  mutation unfollowUser($targetUserId: ID!) {
    unfollowUser(targetUserId: $targetUserId) {
      _id
      username
    }
  }
`;
