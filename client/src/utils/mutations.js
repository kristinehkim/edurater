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

export const ADD_RATE = gql`
  mutation addRate($rateText: String!) {
    addRate(rateText: $rateText) {
      _id
      rateText
      rateAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($rateId: ID!, $commentText: String!) {
    addComment(rateId: $rateId, commentText: $commentText) {
      _id
      rateText
      rateAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
