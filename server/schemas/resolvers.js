const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const fs = require("fs");
var path = require("path");

// async function checkSubDirectory (path) {
//   try {
//   await fs.promises.opendir(path);
//   return true;
// } catch (e) {
//   // console.log(e);
//   return false;
// }
// }


async function print(path) {
  const fileNames = [];
  // const subFileNames = [];
  let id = 0;

  try {
    const dir = await fs.promises.opendir(path);
    for await (const dirent of dir) {
      // console.log(dirent.name);
      if (dirent.isDirectory()) {
        // fileNames.push({ name: dirent.name, type: "directory" });

        // console.log("dirent:", dirent);

        let newPath = path + "/" + dirent.name;
        // console.log("Test2path:", newPath);

        //  let teste = await fs.promises.access(path, fs.constants.R_OK | fs.constants.W_OK);
        //  try {
        //   await fs.promises.access(newPath, fs.constants.R_OK | fs.constants.W_OK);
        //   console.log('can access');
        // } catch {
        //   console.error('cannot access');
        // }

        //  console.log("Test2:", teste);
        // if (await fs.promises.access(newPath)) {
        
          // if (checkSubDirectory(newPath)) {


          //   console.log("TEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE:", newPath);
          // await fs.promises.access(newPath, fs.constants.F_OK, async (err) => {
          //   console.log("TEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE:", err);
          //     if (err) {
          //       console.log("err:", err);
          //     } else {
        const subDir = await fs.promises.opendir(newPath);
        let subFileNames = [];
        // console.log("Test2:", subDir);
        for await (const dirent1 of subDir) {
          // console.log(dirent.name);
          if (dirent1.isDirectory()) {
            subFileNames.push(dirent1.name);
          // }

          // console.log(subFileNames);
        }
}
// console.log(subFileNames);
fileNames.push({ id: id++, name: dirent.name, type: "directory", folders: subFileNames});

            //   }
            // });

      
        // }

        // fileNames.push({
        //   name: dirent.name,
        //   type: "directory",
        // });
        // console.log(fileNames);
      }
    }


    // let subFileNames = fileNames.map(async (element) => {
    //   let newPath = path + "/" + element.name;

    //   try {
    //     const dir = await fs.promises.opendir(newPath);
    //   for await (const dirent of dir) {
    //     // console.log(dirent.name);
    //     if (dirent.isDirectory()) {
    //       fileNames.push({ name: dirent.name, type: "directory", parent: element.name });
    //     }
    //   }
    //   return fileNames;
    // } catch (e) {
    //   console.log(e);
    // }
      
    // });

  } catch (e) {
    console.log(e);
  }
  
  // console.log("TESTTEST:     ", fileNames);

//   const fileNamesNew = fileNames.reduce((acc, fileName) => {
//     let {name, parentDirectory} = fileName;
//     return {...acc, [parentDirectory]: [...(acc[parentDirectory] || []), name]};
// }, {});

// array = Array.from(fileNamesNew, ([name, value]) => ({ name, value }));
// console.log(array);
  // let fileNamesNew = fileNames.reduce((r, a) => {
  //   r[a.parentDirectory] = r[a.parentDirectory] || [];

  //   const commentWithID = {
  //     children: a.name
  //   };

  //   r[a.parentDirectory].push(commentWithID);
  //   return r;
  // }, {});

  // console.log("TESTTEST123:     ", array);
  // return fileNamesNew;


  // console.log("TESTTEST:     ", fileNames);
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
      //Temporary hardcoded. Make a config or an option in UI
      const filesPath = "C://testFolder";
      // const filesPath = path.join(__dirname, "./files");
      const files = await printArray(filesPath);
      return files.map((file) => ({
        id: file.id,
        name: file.name,
        type: file.type,
        folders: file.folders,
      }));
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
