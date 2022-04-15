// Error Handler Middelware
const errorController = (err, req, res, next) => {
   const codeStatus = res.statusCode ? res.statusCode : 500

   res.status(codeStatus)

   res.json({
      massage: err.massage,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
   })


}



module.exports = {
   errorController
}