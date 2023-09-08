const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    rates: [Rate]!
  }

  type Rate {
    _id: ID
    rateText: String
    rateAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    rates(username: String): [Rate]
    rate(rateId: ID!): Rate
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRate(rateText: String!): Rate
    addComment(rateId: ID!, commentText: String!): Rate
    removeRate(rateId: ID!): Rate
    removeComment(rateId: ID!, commentId: ID!): Rate
  }
`;

module.exports = typeDefs;
