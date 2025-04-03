// src/graphql/queries.ts
import { gql } from "@apollo/client";

///////////////////////////////////
// Cyrl's notes:
// Prevents crazy re-rendering upon retrieval of stories in real time
// Limits the number of stories loaded at a time to prevent crashing
// This is good practice for performance and a safeguard
///////////////////////////////////

// ✅ Get paginated stories — safe for null branches/parentStory.title
export const GET_STORIES = gql`
  query GetStories($limit: Int, $offset: Int) {
    getStories(limit: $limit, offset: $offset) {
      _id
      title
      content
      likes
      author {
        _id
        username
      }
      comments {
        _id
        content
        author {
          _id
          username
        }
      }
      branches {
        _id
        title
        content
        likes
        comments {
          _id
          content
          author {
            _id
            username
          }
        }
      }
      parentStory {
        _id
        title
        content
        likes
        author {
          _id
          username
        }
        comments {
          _id
          content
          author {
            _id
            username
          }
        }
      }
    }
  }
`;



// ✅ Get logged-in user basic data
export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      fullName
    }
  }
`;

// ✅ Get full profile of the logged-in user (bio, avatar, connections)
export const GET_MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      _id
      bio
      avatar
      user {
        _id
        username
        email
        fullName
      }
      followers {
        _id
        username
        email
        fullName
      }
      sharedStories {
        _id
        title
        content
        likes
        comments {
          _id
          content
          author {
            _id
            username
            fullName
          }
        }
        branches {
          _id
          title
        }
        parentStory {
          _id
          title
        }
      }
      likedStories {
        _id
        title
        content
        likes
        comments {
          _id
          content
          author {
            _id
            username
            fullName
          }
        }
        branches {
          _id
          title
        }
        parentStory {
          _id
          title
        }
      }
      branchedStories {
        _id
        title
        content
        likes
        comments {
          _id
          content
          author {
            _id
            username
            fullName
          }
        }
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
  }
`;

// ✅ Get all prompts (if you implement categories/themes for creativity)
export const GET_PROMPTS = gql`
  query GetPrompts {
    getPrompts {
      _id
      category
      theme
      tone
      text
    }
  }
`;
