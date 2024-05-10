/*STAI CREANDO LA PARTE FRONT-END DI UNO SHOP ONLINE. IN PARTICOLARE SARAI RESPONSABILE DELLA CREAZIONE DI UN BACK-OFFICE, 
DOVE GLI AMMINISTRATORI POSSONO AGGIUNGERE E MODIFICARE I PRODOTTI.
L'OBIETTIVO DI OGGI E' CONNETTERE UN'INTERFACCIA ALLE API PER POTER RICEVERE PRODOTTI, CREARNE NUOVI, MODIFICARLI UNA VOLTA CREATI E 
CANCELLARLI ALL'OCCORRENZA.
QUESTO E' L'ENDPOINT PRINCIPALE https://striveschool-api.herokuapp.com/api/product/ 
PER CREARE NUOVI PRODOTTI DOVRAI PARTIRE DA UNO DEI PRODOTTI E FORMARLO CON ALCUNE DELLE PROPRIETA' RICHIESTE PER POI INVIARLO
COME PAYLOAD DELLA CHIAMATA POST.
OGNI CHIAMATA DOVRA' ESSERE AUTENTICATA! L'AUTENTICAZIONE DI QUESTE API E' UNA "TOKEN BASED AUTHENTICATIOn" PER RENDERE
PRIVATO L'ACCESSO AI SUOI CONTENUTI. SENZA ESSERE AUTENTICATO NON POTRAI OTTENERE I DATI DI CUI HAI BISOGNO */
//IL TOKEN DOVRA' ANDARE NELLA PROPRIETA' DEGLI HEADER: Authorization.
//INVIANDO COME PAYLOAD: {"username:" "testusername@yourmail.com", "password": "testpassword"}

//OBIETTIVI:
//1) AVERE UNA PAGINA BACK-OFFICE, IN CUI SI POTRANNO INSERIRE I PRODOTTI SPECIFICANDO I PARAMETRI OBBLIGATORI E FACOLTATIVI
//2) AVERE UNA HOMEPAGE CHE MOSTRI TUTTI I PRODOTTI DISPONIBILI
//3) AVERE UNA PAGINA DI DETTAGLIO IN CUI VISUALIZZARE TUTTI I DETTAGLI DI UN PRODOTTO
//TASK:
//NELLA PAGINA DI BACKOFFICE:
//1)USA POST SU /product CON UN PAYLOAD PER CREARE UN NUOVO PRODOTTO
//2)AGGIUNGI UN BOTTONE PER LE FUNZIONALITA' DI MODIFICA DI UN PRODOTTO GIA' CREATO IN PRECEDENZA (USA UN PUT SU /product/:id)
//3)AGGIUNGI UN BOTTONE PER LE FUNZIONALITA' DI CANCELLAZIONE DI UN PRODOTTO GIA' CREATO IN PRECEDENZA (USA UN DELETE SU /product/:id)
//4)I TASTI "MODIFICA" E "CANCELLA" DOVRANNO ESSERE VISIBILI SOLO SE SI E' IN MODALITA' DI MODIFICA DELLA RISORSA.
//5)AGGIUNGI UNA VALIDAZIONE DI BASE PER LA CREAZIONE/MODIFICAZIONE DI UN PRODOTTO NEL FORM
//6)AGGIUNGI UN BOTTONE "RESET" PER PULIRE IL FORM

//NELLA HOMEPAGE:
//1)PREMENDO UN BOTTONE "MODIFICA" SU UN PRODOTTO SI DOVRA' POTERLO MODIFICARE

//NELLA PAGINA DI DETTAGLIO:
//1)A QUESTA PAGINA CI SI ARRIVERA' CLICCANDO SU UN BOTTONE "Scopri di più" SULLA CARD IN HOMEPAGE

//EXTRA:
//1)IN BACK-OFFICE: I BOTTONI "RESET" E "DELETE" DOVRANNO CHIEDERE CONFERMA PRIMA DI PROCEDERE CON L'OPERAZIONE
//2)IN HOMEPAGE: AGGIUNGI UN INDICATORE DI CARICAMENTO AFFIANCO AL TITOLO PRINCIPALE DELLA PAGINA DURANTE IL CARICAMENTO DELLE RISORSE
//3)CREA UN SISTEMA DI GESTIONE DEGLI ERRORI. MOSTRA ALL'UTENTE UN MESSAGGIO DI ERRORE SPECIFICO PER LE VARIE TIPOLOGIE DI PROBLEMA, QUANDO QUALCOSA VA STORTO, ATTRAVERSO L'UTILIZZO DI COMPONENTI DI BOOTSTRAP APPROPRIATI



// HOMEPAGE

// prendo l'anno
document.getElementById('year').innerText = new Date().getFullYear()

// generiamo le card per quanto riguarda i nostri telefoni

const generatePhoneCards = function (phonesArray) {
  const row = document.getElementById('events-row')
  phonesArray.forEach((phone) => {
    const newCol = document.createElement('div')
    newCol.classList.add('col')
    newCol.innerHTML = `
        <div class="card h-100 d-flex flex-column scale highlight">
          <img src="${phone.imageUrl}" class="card-img-top h-100 " alt="...">
          <div class="card-body d-flex flex-column justify-content-around">
            <h5 class="card-title fw-bold">${phone.name}</h5>
            <p class="card-text fst-italic">${phone.description}</p>
            <p class="card-text fst-italic fw-bold">${phone.brand}</p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-dark">${phone.price}€</button>
              <a href="details.html?phoneId=${phone._id}" class="btn btn-outline-danger">INFO</a>
            </div>
          </div>
        </div>
        `
    row.appendChild(newCol)
  })
}

const getPhone = function () {
  //  recuperiamo la lista di eventi attualmente nel database
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGNkMTgxODQ0MjAwMTUzNzU4OWUiLCJpYXQiOjE3MTUzMzAyNTcsImV4cCI6MTcxNjUzOTg1N30.9x5Sqm2Q3PLPsvNk9HQsqU34PcceGEUyn3HfN9FZ1II"
    }
  })
    .then((response) => {
      if (response.ok) {
        console.log(response)
        return response.json()
      } else {
        throw new Error('Errore nella risposta del server')
      }
    })
    .then((array) => {
      console.log('ARRAY!', array)
      // creiamo le card per la landing page
      generatePhoneCards(array)
      spinner.style.visibility = "hidden";
    })
    .catch((err) => {
      console.log('ERRORE!', err)
    })

}
getPhone()



