class App {
  main() {
    this.applyTranslations();
    document.getElementById("add-btn").onclick = () => {
      notesArray.push(new Note(""));
      Note.saveAllNotes();
    };
    Note.populateNotes();
    setInterval(function () {
      Note.saveAllNotes();
    }, TWO_SECONDS);
  }

  applyTranslations() {
    document.getElementById("add-btn").textContent =
      STRINGS["BUTTONS"]["ADD"];
    document.getElementById("back").textContent = STRINGS["LINKS"]["BACK"];
  }
}

let app = new App();
app.main();