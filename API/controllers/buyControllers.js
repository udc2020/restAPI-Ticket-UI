const asyncHandler = require('express-async-handler')
const Clients = require('../models/clientsModel')
const Tickets = require('../models/ticketsModel')


let counter = 0

// GET /api/buy/:id (public)
const getTicketBuy = asyncHandler(async (req, res) => {
   const ticket = await Tickets.findById(req.params.id)
   if (!ticket) {
      res.status(500)
      throw new Error('Ticket dont Exists')
   }
   res.status(200).json(ticket)
})

// POST /api/buy/:id (public)
const setTicketBuy = asyncHandler(async (req, res) => {
   const ticket = await Tickets.findById(req.params.id)
   if (!ticket) {
      res.status(500)
      throw new Error('Ticket dont Exists')
   }
   if (ticket.currentTickets < ticket.maxTicket) {
      counter = ticket.currentTickets + 1
      const client = await Clients.create({
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         ticketId: req.params.id,
         ticketNumber: counter
      })

      const updateTicketCounter = await Tickets.findByIdAndUpdate({
         "_id": req.params.id
      }, {
         $set: {
            "currentTickets": counter
         }
      })

      res.status(201).json(client)

   } else {
      res.status(200).json({
         massage: "Tickets Sold Out"
      })
   }


})




module.exports = {
   getTicketBuy,
   setTicketBuy

}