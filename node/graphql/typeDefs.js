const { gql } = require("apollo-server");

module.exports = gql`
  type Recipe {
    id: ID!
    name: String!
    description: String!
    category: String
    instructions: String
    createdDate: String
    likes: Int
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input RecipeInput {
    name: String!
    description: String!
  }

  input EditRecipeInput {
    name: String!
  }

  type Query {
    recipe(id: ID!): Recipe
    getRecipes(amount: Int!): [Recipe]
  }
  type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean!
    editRecipe(ID: ID!, recipeInput: RecipeInput): Recipe!
    register(registerInput: RegisterInput): User!
  }
`;
