const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Profile {
    _id: ID!
    user: User!
    bio: String
    avatar: String
    followers: [User]
    sharedStories: [Story]
    branchedStories: [Story]
    likedStories: [Story]
  }

  type Story {
    _id: ID!
    title: String!
    content: String!
    author: User!
    likes: Int
    comments: [Comment]
    parentStory: Story
    branches: [Story]
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth!
    addUser(username: String!, email: String!, password: String!): Auth!
  }
`;

export default typeDefs;
