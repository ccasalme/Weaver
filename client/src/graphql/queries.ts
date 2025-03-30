import { gql } from "@apollo/client";

// Get Logged-in User Data
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      profile {
        bio
        avatar
        followers {
          username
        }
        sharedStories {
          _id
          title
          content
        }
      }
    }
  }
`;

// Get All Stories for Homepage
export const QUERY_STORIES = gql`
  query getStories {
    getStories {
      _id
      title
      content
      likes
      author {
        username
        profile {
          avatar
        }
      }
    }
  }
`;
