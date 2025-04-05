// src/graphql/queries.ts
import { gql } from "@apollo/client";

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
        author {
          _id
          username
        }
        likes {
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
      }
      followers {
        _id
        username
        email
      }
      sharedStories {
        _id
        title
        content
        likes
        comments {
          _id
          author {
            _id
            username
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
