const express = require('express')
const {
   getTicketBuy,
   setTicketBuy
} = require('../controllers/buyControllers')
const router = express.Router()

// Get all tikets & Craete new teket
router.route("/:id")
   .get(getTicketBuy)
   .post(setTicketBuy)




module.exports = router