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

  type Comment {
    _id: ID!
    content: String!
    author: User!
    story: Story!
  }

  type Prompt {
    _id: ID!
    category: String!
    theme: String!
    tone: String!
    text: String!
  }

  type Vote {
    _id: ID!
    story: Story!
    user: User!
    voteType: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    me: User
    myProfile: Profile
    getUsers: [User]
    getPrompts: [Prompt]
    getStories: [Story]
  }

  type Mutation {
    login(email: String!, password: String!): Auth!
    addUser(username: String!, email: String!, password: String!): Auth!
    createStory(title: String!, content: String!): Story!
    branchStory(storyId: ID!, title: String!, content: String!): Story!
    likeStory(storyId: ID!): Story!
    addComment(storyId: ID!, content: String!): Comment!
    deleteStory(storyId: ID!): Story!
    voteStory(storyId: ID!, voteType: String!): Vote!
  }
`;

export default typeDefs;
