import { gql } from "@apollo/client";

// User Login
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Add New User
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Create a New Story
export const ADD_STORY = gql`
  mutation addStory($title: String!, $content: String!) {
    addStory(title: $title, content: $content) {
      _id
      title
      content
    }
  }
`;

// Add a Comment to a Story
export const ADD_COMMENT = gql`
  mutation addComment($storyId: ID!, $content: String!) {
    addComment(storyId: $storyId, content: $content) {
      _id
      content
      story {
        _id
      }
    }
  }
`;

// Upvote a Story
export const VOTE_STORY = gql`
  mutation voteStory($storyId: ID!, $voteType: String!) {
    voteStory(storyId: $storyId, voteType: $voteType) {
      _id
      likes
    }
  }
`;
