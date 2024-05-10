document.getElementById('year').innerText = new Date().getFullYear()

// all'avvio della pagina dettagli noi vogliamo caricare i dati FRESCHI del concerto in questione
// lo faremo con una GET molto specifica grazie all'_id del concerto che ci siamo passati nella barra degli indirizzi

const addressBarContent = new URLSearchParams(location.search) // isola i parametri nel contenuto della barra degli indirizzi
console.log(addressBarContent)
const phoneId = addressBarContent.get('phoneId')

const getPhoneData = function () {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${phoneId}`, {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGNkMTgxODQ0MjAwMTUzNzU4OWUiLCJpYXQiOjE3MTUzMzAyNTcsImV4cCI6MTcxNjUzOTg1N30.9x5Sqm2Q3PLPsvNk9HQsqU34PcceGEUyn3HfN9FZ1II"
    }
  })
    // una chiamata GET fatta così NON CI TORNA TUTTI GLI EVENTI, ma UNO nello specifico!
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'evento")
      }
    })
    .then((phone) => {
      console.log('DETTAGLI RECUPERATI', phone)
      // ora manipolo il DOM e riempio la card
      document.getElementById('name').innerText = phone.name
      document.getElementById('description').innerText = phone.description
      document.getElementById('price').innerText = phone.price + '€'
      document.getElementById('brand').innerText = phone.brand
      document.getElementById('imageUrl').src = phone.imageUrl
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })

}
getPhoneData()

// funzione ELIMINA
const deleteEvent = function () {
  // Visualizza il modale di conferma
  const confermaEliminazione = window.confirm(
    "Sei sicuro di voler eliminare il prodotto?"
  );

  // Se l'utente ha confermato, procedi con l'eliminazione
  if (confermaEliminazione) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${phoneId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGNkMTgxODQ0MjAwMTUzNzU4OWUiLCJpYXQiOjE3MTUzMzAyNTcsImV4cCI6MTcxNjUzOTg1N30.9x5Sqm2Q3PLPsvNk9HQsqU34PcceGEUyn3HfN9FZ1II"
      },
    })
      .then((response) => {
        if (response.ok) {
          // Se la risposta è ok, mostra un messaggio di conferma e reindirizza
          alert("PRODOTTO ELIMINATO");
          location.assign("./homepage.html");
        } else {
          // Se la risposta non è ok, mostra un messaggio di errore
          alert("ERRORE - PRODOTTO NON ELIMINATO");
        }
      })
      .catch((err) => {
        console.error("ERRORE", err);
        alert("ERRORE - PRODOTTO NON ELIMINATO");
      });
  } else {
    // Se l'utente ha annullato, non fare nulla
    alert("Eliminazione annullata");
  }
};
// LOGICA DI MODIFICA
// troviamo il bottone modifica nella pagina dettaglio
 const editButton = document.getElementById('edit-button')
 editButton.addEventListener('click', function () {
   location.assign(`backoffice.html?phoneId=${phoneId}`)
 })

