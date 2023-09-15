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
  mutation addRating($ratingText: String!, $ratedEducator: String!, $educatorRating: Int!) {
    addRating(ratingText: $ratingText, ratedEducator: $ratedEducator, educatorRating: $educatorRating) {
      _id
      ratingText
      ratingAuthor
      ratedEducator
      educatorRating
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        commentRating
        createdAt
      }
    }
  }
`;

export const REMOVE_RATING = gql`
  mutation removeRating($ratingId: ID!) {
    removeRating(ratingId: $ratingId) {
      _id
      ratingText
      ratingAuthor
      ratedEducator
      educatorRating
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        commentRating
        createdAt
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($ratingId: Int!, $commentText: String!, $commentAuthor: String!, $commentRating: Int!) {
    addComment(ratingId: $ratingId, commentText: $commentText, commentAuthor: $commentAuthor, commentRating: $commentRating) {
      _id
      ratingText
      ratingAuthor
      ratedEducator
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        commentRating
        createdAt
      }
    }
  }
`;
