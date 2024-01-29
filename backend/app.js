const express = require("express")
const cors = require("cors")
const userRoute = require("./routes/User")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const User = require("./models/User")
const blogRoute = require("./routes/Blog")
const session = require("express-session")
const { isAuthenticated } = require("./middlewares/authmiddleware")
const app = express()
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" })
}
app.use(cookieParser())
// app.use(
//   session({
//     secret: "temparary",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//       maxAge: 7 * 24 * 3600 * 1000,
//     },
//   })
// )
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)
// app.use(isAuthenticated)
app.use("/api/v1", blogRoute)
app.use("/api/v1", userRoute)
// app.use("/api/v1", blogRoute)

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "working root directory",
  })
})

module.exports = app
