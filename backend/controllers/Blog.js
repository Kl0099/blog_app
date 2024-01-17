const Blog = require("../models/Blog")
const User = require("../models/User")
const cloudinary = require("cloudinary")
exports.createBlog = async (req, res) => {
  try {
    const cloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "blogs",
    })

    let blogData = {
      title: req.body.title,
      description: req.body.description,
      image: {
        public_id: cloud.public_id,
        url: cloud.url,
      },
      owner: req.user.id,
    }

    // console.log(title, description, owner, image)
    const blog = await Blog.create(blogData)
    const user = await User.findById(req.user.id)
    user.blogs.push(blog._id)
    await user.save()
    res.status(200).json({
      success: true,
      blog,
      message: "blog create successfully",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
exports.likeAndDislike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog)
      return res.status(404).json({ success: false, message: "not found" })
    if (blog.likes.includes(req.user.id)) {
      const idx = blog.likes.indexOf(req.user.id)
      blog.likes.splice(idx, 1)
      blog.save()
      return res.status(200).json({
        success: true,
        message: "disliked",
      })
    } else {
      blog.likes.push(req.user.id)
      blog.save()
      return res.status(200).json({
        success: true,
        message: "liked",
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
exports.addAndUpdateComment = async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  // console.log(req.body.comment)
  if (!blog)
    return res.status(404).json({
      success: false,
      message: "not found",
    })
  //find comment index
  let idx = -1
  blog.comments.forEach((item, indx) => {
    if (item.user.toString() === req.user._id.toString()) {
      idx = indx
    }
  })
  //now we got the index number
  if (idx !== -1) {
    if (req.body.comment) {
      blog.comments[idx].comment = req.body.comment
      blog.save()
      return res.status(200).json({
        succes: true,
        message: "comment updated",
      })
    } else {
      return res.status(400).json({
        success: false,
        message: "comment is required",
      })
    }
  } else {
    blog.comments.push({
      user: req.user.id,
      comment: req.body.comment,
    })
    blog.save()
    return res.status(200).json({
      success: true,
      message: "comment added",
    })
  }
}
exports.deleteComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog)
      return res.status(404).json({
        success: false,
        message: "not found",
      })
    // console.log(blog.owner.toString())
    // console.log(blog.comments)
    // console.log(req.params.id)
    // console.log(blog)

    if (blog.owner.toString() === req.user.id.toString()) {
      blog.comments.forEach((item, index) => {
        //here commentId from body so we can easily remove selected comment
        if (item._id.toString() === req.body.commentId.toString()) {
          return blog.comment.splice(index, 1)
        }
      })
      await blog.save()
      res.status(200).json({
        success: true,
        message: "selected comment deleted ",
      })
    } else {
      blog.comments.forEach((item, index) => {
        if (item.user.toString() === req.user.id.toString()) {
          return blog.comments.splice(index, 1)
        }
      })
      await blog.save()
      res.status(200).json({
        success: true,
        message: "comment deleted successfully",
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog)
    return res.status(404).json({
      success: false,
      message: "not found",
    })
  if (blog.owner.toString() !== req.user._id.toString()) {
    console.log(" user : ", req.user._id.toString())
    console.log("blog owner", blog.owner.toString())
    return res.status(401).json({
      success: false,
      message: "unAuthorised",
    })
  }
  const user = await User.findById(req.user.id)
  await cloudinary.v2.uploader.destroy(blog.image.public_id)
  user.blogs.forEach(async (item, index) => {
    if (item._id.toString === req.params.id.toString()) {
      user.splice(index, 1)
      await user.save()
    }
  })
  await blog.deleteOne()
  res.status(201).json({
    success: true,
    message: "deleted successfully",
  })
}
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({ success: false, message: "Post not found" })
    }
    if (blog.owner.toString() !== req.user._id.toString()) {
      return res.status(404).json({ success: false, message: "unAuthorized" })
    }
    const { title, description } = req.body
    if (title) {
      blog.title = title
    }
    if (description) {
      blog.description = description
    }
    await blog.save()
    res
      .status(200)
      .json({ success: true, message: "blog updated successfully", blog })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
exports.getAllBlogs = async (req, res) => {
  try {
    const blog = await Blog.find()
      .populate("likes")
      .populate("owner")
      .populate("title")
      .populate("comments")
    const allBlogs = []
    if (!blog)
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      })

    res.status(200).json({ success: true, blog })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
exports.getSingleblog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("likes")
      .populate("owner")
      .populate("comments")
    if (!blog)
      return res.status(404).json({ success: false, message: "not found" })
    res.status(200).json({ success: true, blog })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}