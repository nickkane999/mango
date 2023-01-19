const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    email: String
    createdDate: String!
    updatedDate: String!
  }
  type AuthUser {
    user: User!
    token: String!
  }
  input CreateUserInput {
    username: String!
    password: String!
    confirmPassword: String
  }
  input EditUserInput {
    username: String
    password: String
    email: String
  }
  input LoginInput {
    username: String!
    password: String!
  }

  input RecipeInput {
    name: String!
    description: String!
  }

  type Query {
    login(loginInput: LoginInput!): AuthUser!
    user(id: ID!): User
    userByName(username: String!): User
    getUsers(amount: Int!): [User]
  }
  type Mutation {
    createUser(createUserInput: CreateUserInput): User!
    deleteUser(id: ID!): Boolean!
    editUser(id: ID!, editUserInput: EditUserInput): User!
  }
`;
