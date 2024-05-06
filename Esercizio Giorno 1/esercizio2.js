//utilizziamo il form per prendere i vari dati dei padroni e dei cani

// nome dell'animale
const animalName = document.getElementById('animalName')

// nome del padrone

const proprietaryName = document.getElementById('proprietaryName')

// nome della specia

const specieAnimale = document.getElementById('nomeSpecie')

// nome della razza

const raceName = document.getElementById('raceName')

// riferimento generico al form

const formTag = document.getElementsByTagName('form')[0]

// creiamo ora l'array che inserirà le cards con le nostre informazioni

const pets = []

// classe pets

class Pets{
    constructor(_animalName,_proprietaryName,_nomeSpecie,_raceName){
        this.animalName = _animalName
        this.proprietaryName = _proprietaryName
        this.nomeSpecie = _nomeSpecie
        this.raceName = _raceName
    }
}

const insertPets = function () {
    // prendo un riferimento alla riga dove sono contenute le colonne
    const petsRow = document.getElementById('pets-row')
    // prima della creazione delle cards dovrà svuotare i contenuti esistenti
    petsRow.innerHTML = ''
    // adesso, per ogni elemento di pets, creo una colonna con dentro il contatto
    pets.forEach((pet) => {
      // cosa faccio con ogni pets?
      // creo un div vuoto
      const newDiv = document.createElement('div') // <div></div>
      // rendiamo questo div una col di bootstrap
      newDiv.classList.add('col')
      // riempio newDiv con una card
      newDiv.innerHTML = `
          <div class="card${
            pet.fav ? ' border border-success border-3' : ''
          }">
              <div class="card-body">
                  <h5 class="card-title">${pet.animalName}</h5>
                  <h5 class="card-title">${pet.proprietaryName}</h5>
                  <h5 class="card-title">${pet.nomeSpecie}</h5>
                  <h5 class="card-title">${pet.raceName}</h5>
              </div>
          </div>
      `
      // appendo ora la col alla row
      petsRow.appendChild(newDiv)
    })
  }

  // ora occupiamoci dell'evento di submit del form

  formTag.addEventListener('submit',function(e){
    e.preventDefault() // previene i comportamenti di default

    const dateFromForms = new Pets(
        animalName.value,
        proprietaryName.value,
        specieAnimale.value,
        raceName.value
    )


  // aggiungiamo i dati ai dati correnti

  pets.push(dateFromForms)

  console.log('dati aggiornati', dateFromForms)

  // azzeriamo il form

  animalName.value = ''
  proprietaryName.value = ''
  specieAnimale.value = ''
  raceName.value = ''

  //aggiorniamo la riga con le colonne con un nuovo elemento per i miei nuovi dati
  insertPets()
  })


