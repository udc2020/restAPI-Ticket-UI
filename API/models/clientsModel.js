const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
   firstName: {
      type: String,
      required: [true, "Please add Your First name"]
   },
   lastName: {
      type: String,
      required: [true, "Please add Your Last name"]
   },
   ticketId: {
      type: String,
      required: true
   },
   ticketNumber: {
      type: Number,
      required: true
   }
})



module.exports = mongoose.model("Clients", clientSchema)