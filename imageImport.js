import { promises as fs } from "fs";
import path from "path";

const IMAGE_DIRECTORY = "./imageCarry/";

async function imageurlArray() {
  try {
    const readObj = await fs.readFile("./imageText.txt", "utf8");
    return readObj
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  } catch (err) {
    console.error(`Error reading URLs: ${err}`);
    return [];
  }
}

async function importSave(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed: ${url}`);

    const arrayBuffer = await response.arrayBuffer();
    const nodeBuffer = Buffer.from(arrayBuffer);

    // Extract file name from URL
    const fileName = path.basename(url);

    // create full save path
    const savePath = path.join(IMAGE_DIRECTORY, fileName);

    // ensure directory exists
    await fs.mkdir(IMAGE_DIRECTORY, { recursive: true });

    await fs.writeFile(savePath, nodeBuffer);
    console.log(`Saved: ${fileName}`);
  } catch (err) {
    console.error(`Error Saving ${url}: ${err}`);
  }
}

async function imageImport() {
  try {
    const imgURLarray = await imageurlArray();
    Promise.all(imgURLarray.map((url) => importSave(url)));
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

imageImport();
