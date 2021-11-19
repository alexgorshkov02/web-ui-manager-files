const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const fs = require("fs");
var path = require("path");

const resolvers = {
  Query: {
    user: async () => {
      return await User.find();
    },

    files: () => {
      const filesPath = path.join(__dirname, "./files");
      const files = fs.readdirSync(filesPath);
      return files.map((file) => ({ path: file }));
    },

    //resolver function for greeting
    greeting: () => {
      return "hello from  TutorialsPoint !!!";
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
