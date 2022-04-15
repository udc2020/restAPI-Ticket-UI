const mongoose = require("mongoose")

const ticketSchema = mongoose.Schema({
   header: {
      type: String,
      required: [true, "you must add header"]
   },
   date: {
      type: String,
      required: [true, "you must add date"]
   },
   getsOpen: {
      type: String,
      required: [true, "you must add open gate time"]
   },
   stadium: {
      type: String,
      required: [true, "you must add stadium"]
   },
   team1: {
      type: String,
      required: [true, "you must add team1"]
   },
   team2: {
      type: String,
      required: [true, "you must add team2"]
   },
   price: {
      type: Number,
      required: [true, "you must add price"]
   },
   color: {
      type: String,
      required: [true, "you must add color"]
   },
   round: {
      type: String,
      required: [true, "you must add round"]
   },
   maxTicket: {
      type: Number,
      required: [true, "you must add max ticket"]
   },
   currentTickets: {
      type: Number,
      default: 0
   }

})

module.exports = mongoose.model("Tickets", ticketSchema)