const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    ratings: [Rating]!
  }

  type Rating {
    _id: ID
    ratingText: String
    ratingAuthor: String
    ratedEducator: String
    educatorRating: Int
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    commentRating: Int!
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    ratings(username: String): [Rating]
    rating(ratingId: ID!): Rating
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRating(ratingText: String!, ratedEducator: String!, educatorRating: Int!): Rating
    addComment(ratingId: ID!, commentText: String!, commentAuthor: String!, commentRating: Int!): Rating
    removeRating(ratingId: ID!): Rating
    removeComment(ratingId: ID!, commentId: ID!): Rating
  }
`;

module.exports = typeDefs;
