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

// 🚧 TODO: AddUser mutation (not yet in your client)
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

// ✅ Like or Vote on a story
export const LIKE_STORY = gql`
  mutation likeStory($storyId: ID!) {
    likeStory(storyId: $storyId) {
      _id
      likes
    }
  }
`;

// ✅ Comment on a story
export const ADD_COMMENT = gql`
  mutation addComment($storyId: ID!, $content: String!) {
    addComment(storyId: $storyId, content: $content) {
      _id
      content
      author {
        username
      }
    }
  }
`;

// ✅ Delete a story
export const DELETE_STORY = gql`
  mutation deleteStory($storyId: ID!) {
    deleteStory(storyId: $storyId) {
      _id
      title
    }
  }
`;

// ✅ Vote for a story
export const VOTE_STORY = gql`
  mutation voteStory($storyId: ID!, $voteType: VoteType) {
    voteStory(storyId: $storyId, voteType: $voteType) {
      _id
      voteType
      user {
        username
      }
    }
  }
`;

// ✅ Optional (not in typedefs, but needed for your profile)
export const UPDATE_PROFILE = gql`
  mutation updateProfile($bio: String, $avatar: String) {
    updateProfile(bio: $bio, avatar: $avatar) {
      _id
      bio
      avatar
      followers {
        username
      }
      user {
        username
      }
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
