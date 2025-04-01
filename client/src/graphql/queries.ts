import { gql } from "@apollo/client";

export const GET_STORIES = gql`
  query getStories {
    getStories {
      _id
      title
      content
      author {
        username
      }
      likes
      comments {
        _id
        content
        author {
          username
        }
      }
      branches {
        _id
        title
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
// src/graphql/queries.ts
export const GET_MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      username
      bio
      avatar
      followers {
        username
      }
      sharedStories {
        _id
        title
        content
        comments {
          _id
          content
          author {
            username
          }
        }
      }
      likedStories {
        _id
        title
        content
        comments {
          _id
          content
          author {
            username
          }
        }
      }
      branchedStories {
        _id
        title
        content
        comments {
          _id
          content
          author {
            username
          }
        }
      }
    }
  }
`;

