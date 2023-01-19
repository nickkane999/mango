import { gql } from "@apollo/client";

const GET_USERS = gql`
  query getUsers($amount: Int!) {
    getUsers(amount: $amount) {
      id
      username
      password
      createdDate
      updatedDate
      email
    }
  }
`;

const GET_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      username
      email
      createdDate
      updatedDate
    }
  }
`;

const LOGIN_USER = gql`
  query Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      user {
        id
        username
        createdDate
        updatedDate
        password
      }
      token
    }
  }
`;

export { GET_USERS, GET_USER, LOGIN_USER };
