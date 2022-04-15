const express = require('express')
const router = express.Router()
const {
   getClients,
   getClient,
   deletClient
} = require('../controllers/clientsController')



router.get("/", getClients)

router.route("/id:")
   .get(getClient)
   .delete(deletClient)



module.exports = router