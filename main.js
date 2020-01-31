const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");

const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//updating the total for selected seats
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  //Copy the selected seats into an array where we can map through and then return a new array
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  //store selected seats into local storage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const countedSeats = selectedSeats.length;

  count.innerText = countedSeats;
  total.innerText = countedSeats * ticketPrice;
}

//movie select event
movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.addEventListener.value);
  updateSelectedCount();
});

//Seat click event
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});
