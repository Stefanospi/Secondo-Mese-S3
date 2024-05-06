// Creo una classe user 
class User {
    // inizializzo la classe col suo costruttore
    constructor(firstName, lastName, age, location) {
      this.firstName = firstName
      this.lastName = lastName
      this.age = age
      this.location = location
    }
  // creo la funzione di comparazione
    compareAge(anotherUser) {
      if (this.age < anotherUser.age) {
        return `${anotherUser.firstName} è più vecchio di ${this.firstName}.`
      } else if (this.age > anotherUser.age) {
        return `${anotherUser.firstName} è più giovane di ${this.firstName}.`
      } else {
        return `${anotherUser.firstName} è della stessa età di ${this.firstName}.`
      }
    }
  }
  // costruisco gli user nuovi
  x = new User('Stefano', 'Spitaleri', 23, 'Bronte')
  y = new User('Mario', 'Rossi', 22, 'Zocca')
  z = new User('Francesco', 'Rossi', 25, 'Correggio')
  console.log(x.compareAge(y))
  console.log(y.compareAge(z))
  console.log(z.compareAge(x))
  