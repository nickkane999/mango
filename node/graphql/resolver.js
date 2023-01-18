const { astFromArg } = require("@graphql-tools/utils");
const Recipe = require("../models/Recipe");

module.exports = {
  Query: {
    async recipe(_, { id }) {
      return await Recipe.findById(id);
    },
    async getRecipes(_, { amount }) {
      return await Recipe.find().sort({ createdDate: -1 }).limit(amount);
    },
  },
  Mutation: {
    async createRecipe(_, { recipeInput: { name, description, category, instructions, createdDate, likes, username } }) {
      const newRecipe = new Recipe({
        name,
        description,
        category,
        instructions,
        createdDate: new Date().toISOString(),
        likes: 0,
        username,
      });

      const recipe = await newRecipe.save();

      console.log(recipe);
      return recipe;
    },
    async deleteRecipe(_, { id }) {
      const wasDeleted = (await Recipe.deleteOne({ _id: id })).deletedCount;
      return wasDeleted;
    },
    async editRecipe(_, { id, recipeInput: { name, description, category, instructions, createdDate, likes, username } }) {
      const wasEdited = (await Recipe.updateOne({ _id }, { name, description, category, instructions, createdDate, likes, username })).modifiedCount;
      return wasEdited;
    },
  },
};
