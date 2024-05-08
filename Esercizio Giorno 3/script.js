/*elimino la card*/
const deleteCard = function (e) {
  console.log("ELIMINO CARD", e);
  // come faccio a capire QUALE degli n bottone elimina mi ha portato qui? devo capire QUALE card eliminare...
  // e.target sarà il bottone che abbiamo cliccato
  console.log(e.target.closest(".card"));
  // eliminiamo dal DOM la card
  e.target.closest(".col").remove();
};

/*aggiungo al carrello*/
const compraButtons = document.querySelectorAll(".compra-btn");
const carrello = document.getElementById("carrello");

compraButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var card = this.closest(".card");
    var title = card.querySelector(".card-title").innerText;
    var price = card.querySelector(".card-text").innerText;

    var item = {
      title: title,
      price: price,
    };

    var cartItems = JSON.parse(localStorage.getItem("cartItems"))  [];
    cartItems.push(item);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    aggiornaCarrello();
    alert("Libro aggiunto al carrello!");
  });
});

function aggiornaCarrello() {
  carrello.innerHTML = "";
  var cartItems = JSON.parse(localStorage.getItem("cartItems"))  [];
  cartItems.forEach(function (item) {
    var li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = item.title + " - " + item.price;
    carrello.appendChild(li);
  });
}