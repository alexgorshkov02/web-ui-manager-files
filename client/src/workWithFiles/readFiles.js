const fs = require("fs");

async function print(path) {
  const fileNames = [];
  let i = 0;
  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir) {
    // console.log(dirent.name);
    if (dirent.isDirectory()) {
      fileNames.push({
        id: i++,
        name: dirent.name,
      });
    }
  }
  return fileNames;
}

const path = "C://";
//  print(path).catch(console.error);
async function printArray(path) {
  try {
    const array = await print(path);
    console.log(array);
  } catch (e) {
    console.log(e);
  }
}

printArray(path);

export default print;
