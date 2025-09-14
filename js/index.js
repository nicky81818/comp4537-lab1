class App {
  main(){
    this.applyTranslations();
  }
  
  applyTranslations(){
    document.getElementById("writer-link").innerHTML = STRINGS.LINKS.WRITER;
    document.getElementById("reader-link").innerHTML = STRINGS.LINKS.READER;
  }
}

let app = new App();
app.main();