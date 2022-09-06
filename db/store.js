const { json } = require("body-parser");
const fs = require("fs");
const util = require("util");
const uuid = require("uuid");
const { resourceLimits } = require("worker_threads");

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

    addNote(note) {
        note.id = uuid.v4();
        return this.getNotes()
            .then((retrievedNotes) => {
                retrievedNotes.push(note);
                return retrievedNotes;
            })
            .then((updatedNotes) => {
                return this.writeFile(updatedNotes);
            })
            .then(() => {
                return note;
            });
    }

    deleteNote(id) {
        return this.getNotes().then((notes) => notes.filter((note) => note.id !== id))
        .then(filteredNotes => this.writeFile(filteredNotes))
    }

}

module.exports = new Store();
