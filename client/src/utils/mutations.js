import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RATING = gql`
  mutation addRating($ratingText: String!) {
    addRating(ratingText: $ratingText) {
      _id
      ratingText
      ratingAuthor
      ratedEducator
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($ratingId: ID!, $commentText: String!) {
    addComment(ratingId: $ratingId, commentText: $commentText) {
      _id
      ratingText
      ratingAuthor
      ratedEducator
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
