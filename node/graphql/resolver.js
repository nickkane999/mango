const { User, AuthUser } = require("./models/User");
const generateToken = require("../token").generateToken;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    async user(_, { id }) {
      return await User.findById(id);
    },
    async userByName(_, { username }) {
      return await User.findOne({ username });
    },
    async getUsers(_, { amount }) {
      return await User.find().sort({ createdDate: -1 }).limit(amount);
    },
    async login(_, { loginInput: { username, password } }) {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid) {
        throw new Error("Invalid credentials");
      }

      return {
        user,
        token: generateToken(user),
      };
    },
  },
  Mutation: {
    async createUser(_, { createUserInput: { username, password, confirmPassword, email } }) {
      if (password === confirmPassword) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newDate = new Date().toISOString();
        const newUser = new User({
          username,
          password: hashedPassword,
          createdDate: newDate,
          updatedDate: newDate,
        });
        const user = await newUser.save();
        return user;
      } else {
        throw new Error("Passwords don't match");
      }
    },
    async deleteUser(_, { id }) {
      const wasDeleted = (await User.deleteOne({ _id: id })).deletedCount;
      return wasDeleted;
    },
    async editUser(_, { id, editUserInput: { username, password, email } }) {
      const wasEdited = (await Recipe.updateOne({ _id }, { username, password, email })).modifiedCount;
      return wasEdited;
    },
  },
};
