import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      rates {
        _id
        rateText
        createdAt
      }
    }
  }
`;

export const QUERY_RATES = gql`
  query getRates {
    rates {
      _id
      rateText
      rateAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_RATE = gql`
  query getSingleRate($rateId: ID!) {
    rate(rateId: $rateId) {
      _id
      rateText
      rateAuthor
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
      rates {
        _id
        rateText
        rateAuthor
        createdAt
      }
    }
  }
`;
