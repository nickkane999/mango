const { model, Schema } = require("mongoose");

const recipeSchema = new Schema({
  name: String,
  category: String,
  description: String,
  instructions: String,
  createdDate: String,
  likes: Number,
  username: String,
});

module.exports = model("Recipe", recipeSchema);
