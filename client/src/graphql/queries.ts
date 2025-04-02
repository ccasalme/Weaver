import { gql } from "@apollo/client";

// ✅ Query: Get all stories
export const GET_STORIES = gql`
  query GetStories {
    getStories {
      _id
      title
      content
      likes
      author {
        _id
        username
        email
        fullName
      }
      comments {
        _id
        content
        author {
          _id
          username
          email
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
`;

// ✅ Query: Get the currently logged-in user
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

// ✅ Query: Get the full profile of the logged-in user
export const GET_MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      _id
      user {
        _id
        username
        email
        fullName
      }
      bio
      avatar
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

// ✅ Query: Get all prompts (optional but defined in your schema)
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
