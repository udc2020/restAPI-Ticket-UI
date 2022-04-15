const ticketsNumber = document.querySelector("#ticketsNumber")
const tableTickets = document.querySelector("#tableTickets")
const generateTicket = document.querySelector("#generateTicket")
const btnEdit = document.querySelector("#btnEdit")



// URL API 
const API = "http://localhost:8000/api/"

const fetchData = async () => {

   await fetch(`${API}tickets`)
      .then(res=>res.json())
      .then(data =>{

         //? Get Length of tickets 
         getNumberOfTickets(data)

         //? Put All To Table 
         putAllInTable(data)

      })

}

// get all Tickets
fetchData()

// Get Number Of Ticket That Craeted
const getNumberOfTickets = async (data) => {
  
   ticketsNumber.textContent = await data.length
}
// Table Manage Tickets
const tableData = []


// Add All Ticket Information in the Table
const putAllInTable = (data) => {
   let html

   data.forEach(ticket => {

      html = `
      <tr >
         <th scope="row" class="d-inline-block text-truncate" style="max-width: 50%;">${ticket._id}</th>
         <td>${ticket.team1}</td>
         <td>${ticket.team2}</td>
         <td>${ticket.stadium}</td>
         <td>${ticket.maxTicket}</td>
         <td>${ticket.currentTickets}</td>
         <td>${ticket.price}DZ</td>
         <td class="text-uppercase" data-id="${ticket._id}" >
            <a class="btn btn-warning btn-sm" id="editTicket">
               edit
            </a>
            <a class="btn btn-primary btn-sm" href="buy.html?ticketId=${ticket._id}" target="_blank">
               link
            </a>
            <a class="btn btn-danger btn-sm" id="deleteTicket" >
               delete
            </a>
         </td>
      </tr>
   
   `
      tableTickets.innerHTML += html



   })


   tableTickets.addEventListener("click", async (e) => {

      let btnPressed = e.target.id
      const ticketId = e.target.parentElement.dataset.id


      switch (btnPressed) {
         case "editTicket":
            await fetch(`${API}tickets/${ticketId}`, {
                  method: "GET"
               })
               .then(res => res.json())
               .then(data => {
                  console.log(data._id)
                  document.querySelector("[name='header']").value = data.header
                  document.querySelector("[name='date']").value = data.date
                  document.querySelector("[name='getsOpen']").value = data.getsOpen
                  document.querySelector("[name='stadium']").value = data.stadium
                  document.querySelector("[name='team1']").value = data.team1
                  document.querySelector("[name='team2']").value = data.team2
                  document.querySelector("[name='price']").value = data.price
                  document.querySelector("[name='color']").value = data.color
                  document.querySelector("[name='round']").value = data.round
                  document.querySelector("[name='maxTickets']").value = data.maxTicket


                  btnEdit.textContent = "Edit"

                  btnEdit.addEventListener('click', async (e) => {
                     e.preventDefault()
                     let dataEdited = {
                        header: document.querySelector("[name='header']").value,
                        date: document.querySelector("[name='date']").value,
                        getsOpen: document.querySelector("[name='getsOpen']").value,
                        stadium: document.querySelector("[name='stadium']").value,
                        team1: document.querySelector("[name='team1']").value,
                        team2: document.querySelector("[name='team2']").value,
                        price: document.querySelector("[name='price']").value,
                        color: document.querySelector("[name='color']").value,
                        round: document.querySelector("[name='round']").value,
                        maxTicket: document.querySelector("[name='maxTickets']").value,
                     }

                     await fetch(`${API}tickets/${data._id}`, {
                           method: "PUT",
                           headers: {
                              "Content-Type": "application/json; charset=utf-8"
                           },
                           body: JSON.stringify(dataEdited)
                        })
                        .then(res => res.json())
                        .then(data => location.reload())


                  })



               })

            break;
         case "deleteTicket":
            await fetch(`${API}tickets/${ticketId}`, {
                  method: "DELETE"
               })
               .then(res => res.json())
               .then(data => location.reload())

            break;

         default:
            break;
      }


   })



}



// When Form Submited
generateTicket.addEventListener('submit', async (e) => {
   e.preventDefault()

   let dataSubmitted = {
      header: document.querySelector("[name='header']").value,
      date: document.querySelector("[name='date']").value,
      getsOpen: document.querySelector("[name='getsOpen']").value,
      stadium: document.querySelector("[name='stadium']").value,
      team1: document.querySelector("[name='team1']").value,
      team2: document.querySelector("[name='team2']").value,
      price: document.querySelector("[name='price']").value,
      color: document.querySelector("[name='color']").value,
      round: document.querySelector("[name='round']").value,
      maxTicket: document.querySelector("[name='maxTickets']").value,
   }


   await fetch(`${API}tickets`, {
         method: "POST",
         body: JSON.stringify(dataSubmitted),
         headers: {
            "Content-Type": "application/json; charset=utf-8"
         }
      })
      .then(res => res.json())
      .then(data => location.reload())
      .catch(err => console.error(err))


})