require("dotenv").config()

const express = require('express')
const {
   errorController
} = require("./middleware/errorsMiddleware")
const connectDb = require('./config/db')
const app = express()

const cors = require("cors")



connectDb()

const port = process.env.PORT || 5000

// Midelwares
app.use(express.json())
app.use(express.urlencoded({
   extended: false
}))
app.use(cors({
   origin:"*"
}))

// Routes
app.use('/api/tickets', require('./routes/tickets'))
app.use('/api/buy', require('./routes/buy'))
app.use('/api/clients', require('./routes/clients'))



// Error Middelwar
app.use(errorController)


app.listen(port, () => console.log("server starting in port :" + port))