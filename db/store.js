const { json } = require("body-parser");
const fs = require("fs");
const util = require("util");
const uuid = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  readFile() {
    return readFileAsync("db/db.json", "utf8");
  }

  writeFile(notes) {
    return writeFileAsync("db/db.json", JSON.stringify(notes));
  }

  async getNotes() {
    const notes = await this.readFile();
      return JSON.parse(notes);
  }

}



module.exports = new Store();
