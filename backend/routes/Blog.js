const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const { isAuthenticated } = require("../middlewares/authmiddleware");
const {
  createBlog,
  likeAndDislike,
  addAndUpdateComment,
  deleteComment,
  deleteBlog,
  updateBlog,
  getAllBlogs,
  getSingleblog,
} = require("../controllers/Blog");

router.route("/Blog/create").post(isAuthenticated, createBlog);
router.route("/Blog").get(getAllBlogs);
router.route("/BlogSingle/:id").get(getSingleblog);
router
  .route("/Blog/:id")
  .get(isAuthenticated, likeAndDislike)
  .delete(isAuthenticated, deleteBlog)
  .put(isAuthenticated, updateBlog);
router
  .route("/Blog/comment/:id")
  .put(isAuthenticated, addAndUpdateComment)
  .delete(isAuthenticated, deleteComment);

module.exports = router;
