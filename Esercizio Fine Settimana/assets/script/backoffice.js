// recuperiamo i dati inseriti nel form

class Phone {
  constructor(_name, _description, _price, _brand,_imageUrl) {
    this.name = _name
    this.description = _description
    this.price = _price
    this.brand = _brand
    this.imageUrl = _imageUrl

  }
}

const addressBarContent = new URLSearchParams(location.search) // isola i parametri nel contenuto della barra degli indirizzi
const phoneId = addressBarContent.get('phoneId')
console.log('phoneId', phoneId)

let phoneToModify

const getPhoneData = function () {
  //  recuperiamo la lista di eventi attualmente nel database
  fetch(`https://striveschool-api.herokuapp.com/api/product/${phoneId}`, {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGNkMTgxODQ0MjAwMTUzNzU4OWUiLCJpYXQiOjE3MTUzMzAyNTcsImV4cCI6MTcxNjUzOTg1N30.9x5Sqm2Q3PLPsvNk9HQsqU34PcceGEUyn3HfN9FZ1II"
    }
  })
    .then((responde) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'evento")
      }
    })
    .then((phone) => {
      console.log('DETTAGLI RECUPERATI', phone)
      // ora manipolo il DOM e riempio il form
      document.getElementById('name').value = phone.name
      document.getElementById('description').value = phone.description
      document.getElementById('price').value = phone.price
      document.getElementById('brand').value = phone.brand
      document.getElementById('imageUrl').value = phone.imageUrl

      // salvo una copia di questo event in phoneToModify
      phoneToModify = phone
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })
}

if (phoneId) {
  // recupero con una GET i dettagli esistenti dell'evento e ripopolo il form
  getPhoneData()

  // modifichiamo l'etichetta del bottone del forma da "CREA!" a "MODIFICA"
  document.getElementsByClassName('btn-primary')[0].innerText = 'Modifica!'
}


const submitEvent = function (e) {
  e.preventDefault()
  // recuperiamo dei riferimenti agli input del form
  const nameInput = document.getElementById('name') // input field del campo name
  const descriptionInput = document.getElementById('description') // input field del campo description
  const priceInput = document.getElementById('price') // input field del campo price
  const imageInput = document.getElementById('imageUrl') // input field del campo img
  const brandInput = document.getElementById('brand') // input field del campo img

  const phoneFromForm = new Phone(
    nameInput.value,
    descriptionInput.value,
    priceInput.value,
    brandInput.value,
    imageInput.value
  )

  console.log('TELEFONO DA INVIARE ALLE API', phoneFromForm)

  // ora inviamo questo concerto alle API per salvarlo permanentemente in DB
  // dovremo inviare una REQUEST (fetch) però con method 'POST' (NON GET!)

  // l'indirizzo sul quale opererete la POST (se utilizzate delle API RESTful) è IDENTICO all'indirizzo su cui
  // operereste la GET

  // !!!!!!!!
  // submitEvent deve fare cose diverse a seconda che il backoffice stia venendo utilizzato per CREARE o MODIFICARE!
  // se siamo in modalità "MODIFICA" (cioè se abbiamo un eventId) dobbiamo fare una PUT invece di una POST
  // e l'URL deve avere /_id

  let URL = 'https://striveschool-api.herokuapp.com/api/product'
  let methodToUse = 'POST'

  if (phoneId) {
    URL = `https://striveschool-api.herokuapp.com/api/product/${phoneId}`
    methodToUse = 'PUT'
  }

  fetch(URL, {
    // questo oggetto va indicato qualora l'operazione NON sia la default
    // già il fatto che opereremo una POST e non una GET fa in modo che questo secondo parametro vada dichiarato
    method: methodToUse,
    body: JSON.stringify(phoneFromForm), // il body in una request è SEMPRE UNA STRINGA
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGNkMTgxODQ0MjAwMTUzNzU4OWUiLCJpYXQiOjE3MTUzMzAyNTcsImV4cCI6MTcxNjUzOTg1N30.9x5Sqm2Q3PLPsvNk9HQsqU34PcceGEUyn3HfN9FZ1II",
      'Content-type': 'application/json', // informiamo le API che (anche se in formato stringa) stiamo inviando un OGGETTO
      // se avessimo un'API protetta, in questo oggetto headers ci andrebbe anche l'autenticazione:
      // Authorization: 'Bearer xxxxxxxxx'
    },
  })
    .then((response) => {
      if (response.ok) {
        // le modifiche sono state salvate!
        alert(`Phone ${phoneId ? 'modificato' : 'creato'}!`)
      } else {
        // le modifiche NON sono state salvate! -> andare nel network tab del browser e indagare lì
        throw new Error('Errore nel salvataggio della risorsa')
      }
    })
    .catch((err) => {
      console.log('ERRORE', err)
      alert(err)
    })
}

document.getElementById('event-form').addEventListener('submit', submitEvent)


