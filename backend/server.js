const app = require("./app")
const { connectdatabase } = require("./config/database")
const cloudinary = require("cloudinary")
const dotenv = require("dotenv")

connectdatabase()
dotenv.config()
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})
