// API URL 
const URL = "http://localhost:8000/api/"
// Get Parameters From Url 
let params = new URLSearchParams(location.search)

// Check if we have ticket Id on url paramets
if (params.has('ticketId')) {

   fetch(`${URL}tickets/${params.get('ticketId')}`)
      .then(res => res.json())
      .then(data => getAllData(data))

} else {
   location.replace("/frontend/404.html")
}


// Display Data in Ticket 
const getAllData = async (data) => {

   let {
      _id,
      maxTicket,
      header,
      date,
      getsOpen,
      team1,
      team2,
      round,
      stadium,
      price,
      currentTickets,
      color
   } = data

   // Add All data To Card 
   document.querySelector('#maxTicket').textContent = maxTicket
   document.querySelector('#header').textContent = header
   document.querySelector('#date').textContent = date
   document.querySelector('#openGets').textContent = getsOpen
   document.querySelector('#team1').textContent = team1
   document.querySelector('#team2').textContent = team2
   document.querySelector('#stadium').textContent = stadium
   document.querySelector('#round').textContent = round
   document.querySelector('#price').textContent = price
   document.querySelector('#currentTickets').textContent = currentTickets
   document.querySelector('#idClient').textContent = _id + currentTickets
   document.querySelector('.ticket').style.backgroundColor = color

}


document.getElementById('buyTicket')
   .addEventListener('submit', async (e) => {
      e.preventDefault()
      // Create Buy Form Schema
      let dataBuy = {
         firstName: document.getElementById('firstName').value,
         lastName: document.getElementById('lastName').value,
         ticketId: params.get('ticketId'),
         ticketNumber: document.querySelector('#currentTickets').textContent
      }

      // Post Them in Data Base 
      await fetch(`${URL}buy/${params.get('ticketId')}`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(dataBuy)
         })
         .then(res => res.json())
         .then(data => {

            if (data.massage) {
               document.querySelector("#btnBuy").classList.add('disabled')
            }
            if (dataBuy.firstName === "" || dataBuy.lastName === "") {
               alert('Invalid First & Last Name')
            } else printPdf()

         })
         .catch(err => console.error(err))

})



// Print Card (Ticket) To Pdf And Save it
const printPdf = () => {
   // Use html2pdf leb
   html2pdf().from(document.getElementById('ticketPDF')).save()

   // To make card (ticket) Stolen body 
   const cardBody = document.querySelector(".card-body").innerHTML
   document.querySelector("body").innerHTML = cardBody


}