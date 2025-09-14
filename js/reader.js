class App {
  main() {
    this.applyTranslations()
    setInterval(function () {
      Note.populateNotes("reader");
      console.log("refresh");
    }, TWO_SECONDS);
  }
  applyTranslations() {
    document.getElementById("back").textContent = STRINGS["LINKS"]["BACK"];
  }
}

let app = new App();
app.main();
