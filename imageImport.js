import { readFile } from "node:fs";

async function imageImport() {
  try {
    const readObj = readFile("./imageText.txt", "utf8");
    const imageCollection = readObj.split("\n");
    return imageCollection;
  } catch (err) {
    console.log(`err:${err}`);
  }
}

imageImport();
