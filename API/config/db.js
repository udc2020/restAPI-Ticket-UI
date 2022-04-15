const mongoose = require("mongoose")

// Connect Database 
const connectDateBase = async () => {

   try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true
      }).connection
      console.error(`connect to DB`)
   } catch (error) {
      console.log(error)
      process.exit(1)
   }

}


module.exports = connectDateBase