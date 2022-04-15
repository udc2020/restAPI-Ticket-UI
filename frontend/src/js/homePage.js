const mainContent = document.querySelector("#mainContent")
let html

// API URL 
const URL = "http://localhost:8000/api/tickets"

// Whene Window Loaded
window.onload = async () => {

   await fetch(URL)
      .then(res => res.json())
      .then(data => showAll(data))
      .catch(err => console.error(err))

}

// MAke View in Home Page 
const showAll = (data) => {


   data.forEach(ticket => {
      const {
         _id,
         header,
         price,
         team1,
         team2
      } = ticket

      // Card Template
      html = `
         <div class="card mt-2 me-2" style="width: 18rem;">
         <div class="card-body">
         <h5 class="card-title">${header}</h5>
         <p class="card-text">${team1} <span class="fw-bold">Vs</span> ${team2}</p>
         <p class="card-text">price:${price}</p>
         <a href="./buy.html?ticketId=${_id}" class="btn btn-primary">Buy Now</a>
         </div>
      </div>
      
      `
      // Add New Card to Home PAge 
      mainContent.innerHTML += html
   })



}