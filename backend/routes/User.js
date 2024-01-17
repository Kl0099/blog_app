const {
  register,
  login,
  logout,
  updateProfile,
  getUser,
  getMe,
  deleteProfile,
  getAllUsers,
  getMyBlogs,
  getUserblogs,
} = require("../controllers/User")
const User = require("../models/User")
const express = require("express")
const router = express.Router()
const { isAuthenticated } = require("../middlewares/authmiddleware")

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/user/updateProfile").put(isAuthenticated, updateProfile)
router.route("/user/me").get(isAuthenticated, getMe)
router.route("/user/:id").get(isAuthenticated, getUser)
router.route("/myBlogs").get(isAuthenticated, getMyBlogs)
router.route("/users").get(isAuthenticated, getAllUsers)
router.route("/userBlogs/:id").get(isAuthenticated, getUserblogs)
router.route("/user/deleteProfile").delete(isAuthenticated, deleteProfile)

router.route("/user").get((req, res) => {
  res.status(200).json({
    success: true,
    message: "working root userdirectory",
  })
})

module.exports = router
