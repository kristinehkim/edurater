import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      ratings {
        _id
        ratingText
        createdAt
      }
    }
  }
`;

export const QUERY_RATINGS = gql`
  query getRatings {
    ratings {
      _id
      ratingText
      ratingAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_RATING = gql`
  query getSingleRating($ratingId: ID!) {
    rating(ratingId: $ratingId) {
      _id
      ratingText
      ratingAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      ratings {
        _id
        ratingText
        ratingAuthor
        createdAt
      }
    }
  }
`;
