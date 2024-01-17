const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies
    // const ans = localStorage.getItem("cookie")
    // console.log(token)
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "login first",
      })
    }
    const verified = await jwt.verify(token, process.env.SECRETE_JWT_TOKEN)
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
