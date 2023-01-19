import { gql } from "@apollo/client";

// Login page queries
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

// Chart queries
const GET_CHARTS_BY_USER = gql`
  query getChartsByUser($userId: ID!) {
    getChartsByUser(userId: $userId) {
      id
      name
      type
      json
      updatedDate
      createdDate
    }
  }
`;

const UPDATE_CHART_BY_USER = gql`
  mutation updateChartByUser($updateChartId: ID!, $updateChartInput: UpdateChartInput) {
    updateChart(id: $updateChartId, updateChartInput: $updateChartInput) {
      id
      name
      type
      json
      updatedDate
    }
  }
`;

const DELETE_CHART_BY_USER = gql`
  mutation deleteChart($deleteChartId: ID!) {
    deleteChart(id: $deleteChartId)
  }
`;

// Misc queries
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

export { GET_USERS, GET_USER, LOGIN_USER, GET_CHARTS_BY_USER, UPDATE_CHART_BY_USER, DELETE_CHART_BY_USER };
