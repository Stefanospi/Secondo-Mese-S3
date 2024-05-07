// es1


const input = document.getElementById("content");

const save = function () {
  console.log("Premuto");
  const inputValue = input.value;
  localStorage.setItem("text-content", inputValue);
};

const deleteMemory = function () {
  console.log("Premuto");
  localStorage.removeItem("text-content");
  input.value = "";
};

window.onload = function () {
  const savedText = localStorage.getItem("text-content");
  if (savedText) {
    input.value = savedText;
  }
};


// es2

//es2
// contatore
var contatore = sessionStorage.getItem("contatore") || 0;

function aggiornaContatore() {
  contatore++;
  document.getElementById("contatore").innerHTML = contatore + " secondi";
  sessionStorage.setItem("contatore", contatore);
}

// Avvia il contatore
var intervallo = setInterval(aggiornaContatore, 1000);