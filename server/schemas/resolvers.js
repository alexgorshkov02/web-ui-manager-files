const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const fs = require("fs");
var path = require("path");


async function print(path) {
  const fileNames = [];
  let i = 0;
  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir) {
    // console.log(dirent.name);
    if (dirent.isDirectory()) {
      fileNames.push(
        // id: i++,
        // name: dirent.name,
        dirent.name
      );
    }
  }
  return fileNames;
}

async function printArray(path) {
  try {
    const array = await print(path);
    // console.log(array);
    return array;
  } catch (e) {
    console.log(e);
  }
}

const resolvers = {
  Query: {
    user: async () => {
      return await User.find();
    },

    files: async () => {
      const filesPath = "C://";
      // const filesPath = path.join(__dirname, "./files");
      const files = await printArray(filesPath);
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
