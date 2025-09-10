let notesArray = []
class Note{
  static id = 0;
  constructor(text){
    this.text = text;
    this.id = Note.id++;
    this.note = document.createElement("textarea");
    this.note.innerText = text;
    this.note.setAttribute("id", "note_" + this.id)
    this.button = document.createElement("button");
    this.button.innerText = STRINGS.BUTTONS.REMOVE;
    this.button.setAttribute("class", "remove-btn")
    this.button.setAttribute("id", this.id);
    this.button.onclick = this.remove;
    this.div = document.createElement("div");
    this.div.appendChild(this.note);
    this.div.appendChild(this.button);
    this.div.setAttribute("id", `note_${this.id}_grp`)
    document.getElementById("notes").appendChild(this.div)
    localStorage.setItem(`note_${this.id}`, this.text);
  }

  save(text) {
    this.text = text
    this.note.innerText = text
  }

  remove() {
    document.getElementById(`note_${this.id}_grp`).remove();
    notesArray = notesArray.filter(note => note.id !== parseInt(this.id));
  }
}

document.getElementById("add-btn").onclick = () => {
  notesArray.push(new Note("hello there"))
  console.log(notesArray)
}

class App {
  main() {
    this.applyTranslations();

  }

  applyTranslations() {
    document.getElementById("add-btn").textContent = STRINGS["BUTTONS"]["ADD"];
  }
}

let app = new App();
app.main();