const mongoose = require("mongoose")

exports.connectdatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URl)
    .then(() => {
      console.log(`database connected at ${process.env.MONGODB_URL}`)
    })
    .catch((err) => console.log(err))
}
