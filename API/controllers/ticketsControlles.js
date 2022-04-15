const asyncHandler = require('express-async-handler')
const Tickets = require('../models/ticketsModel')



// GET /api/tickets (Private)
const getTickets = asyncHandler(async (req, res) => {
   try {
      const ticket = await Tickets.find()
      res.status(200).json(ticket)
   } catch (error) {
      res.status(500).json({
         massage: "Some errors"
      })
   }
})
// GET /api/tickets (Private)
const getOneTicket = asyncHandler(async (req, res) => {
   try {
      const ticket = await Tickets.findById(req.params.id)
      res.status(200).json(ticket)
   } catch (error) {
      res.status(500).json({
         massage: "Some errors"
      })
   }
})
// POST /api/tickets/ (Private)
const setTicket = asyncHandler(async (req, res) => {


   const ticket = await Tickets.create({
      header: req.body.header,
      date: req.body.date,
      getsOpen: req.body.getsOpen,
      stadium: req.body.stadium,
      team1: req.body.team1,
      team2: req.body.team2,
      price: req.body.price,
      color: req.body.color,
      round: req.body.round,
      maxTicket: req.body.maxTicket,

   })
   res.status(201).json(ticket)

})
// PUT /api/tickets/:id (Private)
const updateTicket = asyncHandler(async (req, res) => {

   const ticket = await Tickets.findById(req.params.id)

   if (!ticket) {
      res.status(400)
      throw new Error("Dont Found Ticket")
   }

   const updateTicket = await Tickets.findByIdAndUpdate(req.params.id, req.body, {
      new: true
   })

   res.status(200).json(updateTicket)
})
// DELETE /api/tickets/:id (Private)
const deleteTicket = asyncHandler(async (req, res) => {
   const ticket = await Tickets.findById(req.params.id)

   if (!ticket) {
      res.status(400)
      throw new Error("Dont Found Ticket")
   }

   await ticket.remove()
   res.status(200).json({
      id: req.params.id,
      massage: "Ticket Removed"
   })
})


module.exports = {
   getTickets,
   getOneTicket,
   setTicket,
   updateTicket,
   deleteTicket
}