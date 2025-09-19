const TWO_SECONDS = 2000;
let savedTime;
let notesArray = [];
class Note{
  static count = 0;

  constructor(text, id=null, page=null){
    this.text = text;
    if (id) {
      this.id = id;
    } else {
      this.id = Note.count++;
    }
    if (Note.count < id) Note.count = id + 1;
    this.note = document.createElement("textarea");
    this.note.innerText = text;
    this.note.setAttribute("id", "note_" + this.id)
    this.div = document.createElement("div");
    this.div.appendChild(this.note);
    if (page !== "reader"){
      this.button = document.createElement("button");
      this.button.innerText = STRINGS.BUTTONS.REMOVE;
      this.button.setAttribute("class", "remove-btn")
      this.button.setAttribute("id", this.id);
      this.button.onclick = this.remove;
      this.div.appendChild(this.button);
    }
    this.div.setAttribute("id", `note_${this.id}_grp`)
    document.getElementById("notes").appendChild(this.div)
    this.note.addEventListener("input", function(event) {

      notesArray = notesArray.map(note => {
        console.log(note)
        if (note.id === Note.getNoteId(event.target.id)){
          note.save(event.target.value)
        }
        Note.saveAllNotes()
        return note;
      })
    })
  }

  save(text) {
    this.text = text
    this.note.innerText = text
  }
  
  remove() {
    document.getElementById(`note_${this.id}_grp`).remove();
    notesArray = notesArray.filter(note => note.id !== parseInt(this.id));
    Note.saveAllNotes();
  }

  toString(){
    return JSON.stringify(this)
  }
  
  static removeAll() {
    notesArray = []
    document.getElementById("notes").innerHTML = ""
    localStorage.removeItem("notes")
  }
  
  static getNoteId(text){
    return parseInt(text.split("_")[1])
  }

  static saveAllNotes() {
    localStorage.setItem("notes", JSON.stringify(notesArray));
    Note.setTime();

  }
  static setTime(page=null) {
    let today = new Date();
    savedTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    let message = page
      ? STRINGS.UPDATED_AT + savedTime
      : STRINGS.STORED_AT + savedTime;
    document.getElementById("time").innerHTML = message;
  }

  static populateNotes(page=null) {
    if (typeof (Storage) == "undefined") {
      alert(STRINGS["WARNING"])
    } else if (localStorage.getItem("notes") == null){
      
    } else {
      let notesArrayStrings = localStorage.getItem("notes")
      Note.removeAll()
      JSON.parse(notesArrayStrings).forEach(note => {
        notesArray.push(new Note(note.text, note.id, page))
      });
      Note.setTime(page)
    }
  }
}