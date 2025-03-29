const typeDefs = `
type User {
_id: ID
username: String
email: String
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
