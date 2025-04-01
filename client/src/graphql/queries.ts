import { gql } from "@apollo/client";

// ✅ Get all stories
export const GET_STORIES = gql`
  query GetStories {
    getStories {
      _id
      title
      content
      author {
        username
      }
      likes
      branches {
        _id
      }
    }
  }
`;

// ✅ Get current logged-in user
export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
    }
  }
`;

// ✅ Get user profile (bio, avatar, saved stories, etc.)
export const GET_MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      bio
      avatar
      followers {
        username
      }
      sharedStories {
        _id
        title
      }
      branchedStories {
        _id
        title
      }
      likedStories {
        _id
        title
      }
    }
  }
`;
