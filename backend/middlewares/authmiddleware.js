const User = require("../models/User")
const JWT = require("jsonwebtoken")
require("dotenv")

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies
    // const ans = localStorage.getItem("cookie")/
    // console.log(jwt)
    // console.log(req.cookies)
    // console.log(req.headers.cookie)
    // console.log(JWT.decode(token))
    // console.log(process.env.SECRETE_JWT_TOKEN)
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "login first",
      })
    }
    const verified = JWT.verify(token, process.env.SECRETE_JWT_TOKEN, {
      algorithms: ["HS256"],
    })
    // console.log(verified)
    req.user = await User.findById(verified._id)
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
