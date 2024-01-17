const { date } = require("joi")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const Blog = require("../models/Blog")
const cloudinary = require("cloudinary")

exports.register = async (req, res) => {
  try {
    // console.log(req.body)
    const { email, password, name, avatar } = req.body
    // console.log(email, password, name)
    const cloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "blogs_avatars",
    })
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      })
    }

    user = await User.create({
      email: email,
      password: password,
      name: name,
      avatar: {
        public_id: cloud.public_id,
        url: cloud.url,
      },
    })
    const token = user.generateToken()
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 3600 * 1000),
      httpOnly: true,
      secure: false,
    }

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
      message: "User registered successfully",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    // console.log(email, password)
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
    console.log("input password : ", password)
    console.log("user password : ", user.password)

    let isValid = bcrypt.compareSync(password, user.password)
    console.log(isValid)
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      })
    }
    const token = await user.generateToken()
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 3600 * 1000),
      httpOnly: true,
      secure: false,
    }
    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
      message: "login successful",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const olduser = await User.findById(req.user._id).select("+password")
    const { name, email, avatar } = req.body
    console.log("old user: " + olduser)
    // console.log("avatr", olduser.avatar.public_id)
    // console.log(avatar.toString() === olduser.avatar.url.toString())
    // console.log(olduser.name, olduser.email, olduser.password)
    // console.log(olduser)
    // console.log(email, password, name)
    // console.log(name, email, avatar)
    console.log(name !== olduser.name)
    console.log(email !== olduser.email)
    console.log(avatar.toString() !== olduser.avatar.url.toString())

    if (name !== olduser.name) {
      olduser.name = name
    }
    if (email !== olduser.email) {
      olduser.email = email
    }
    if (avatar.toString() !== olduser.avatar.url.toString()) {
      await cloudinary.v2.uploader.destroy(olduser.avatar.public_id)
      const cloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "blogs_avatars",
      })
      olduser.avatar.url = cloud.url
      olduser.avatar.public_id = cloud.public_id
    }

    console.log("Before saving: ", {
      email: olduser.email,
      name: olduser.name,
      avatar: olduser.avatar.url,
    })

    await olduser.save()

    console.log("After saving: ", {
      email: olduser.email,
      name: olduser.name,
      avatar: olduser.avatar.url,
    })

    res.status(200).json({
      success: true,
      message: "profile updated successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
exports.logout = async (req, res) => {
  try {
    const token = null
    const options = {
      expires: new Date(Date.now()),
      httpOnly: true,
    }

    return res.status(200).cookie("token", token, options).json({
      success: true,
      message: "logout successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("blogs")
    if (!user)
      return res.status(404).json({
        success: false,
        message: "user not found",
      })
    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
exports.getMe = async (req, res) => {
  try {
    // console.log(req.user._id)
    const user = await User.findById(req.user.id).populate("blogs")
    return res.status(200).json({
      user,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const userId = req.user._id
    const userBlog = user.blogs
    await cloudinary.v2.uploader.destroy(user.avatar.public_id)
    // console.log(userBlog)
    //  all blogs deleted by user
    for (let i = 0; i < userBlog.length; i++) {
      const blog = await Blog.findById(userBlog[i])
      await cloudinary.v2.uploader.destroy(blog.image.public_id)
      await blog.deleteOne()
    }
    await user.deleteOne()

    //find all blog
    const allblog = await Blog.find()
    for (let i = 0; i < allblog.length; i++) {
      const blog = await Blog.findById(allblog[i]._id)
      // console.log(blog)
      //likes

      if (blog.likes.length > 0) {
        for (let j = 0; j < blog.likes.length; j++) {
          // console.log(blog.likes[j])
          if (blog.likes[j].toString() === userId.toString()) {
            // console.log(blog.likes[j])
            blog.likes.splice(j, 1)
          }
        }
        await blog.save()
      }
      //comments
      for (let j = 0; j < blog.comments.length; j++) {
        // console.log(blog.comments[j].user)
        if (blog.comments[j].user.toString() === userId.toString()) {
          // console.log(blog.comments[j].user)
          blog.comments.splice(j, 1)
        }
        await blog.save()
      }
      await blog.save()
    }
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })

    return res.status(200).json({
      success: true,
      message: "profile Deleted successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()

    res.status(200).json({
      success: true,
      users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
exports.getMyBlogs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const blogs = []
    for (let i = 0; i < user.blogs.length; i++) {
      const blog = await Blog.findById(user.blogs[i])
        .populate("likes")
        .populate("comments")
        .populate("owner")
      blogs.push(blog)
    }
    res.status(200).json({
      success: true,
      blogs,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
exports.getUserblogs = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const blogs = []
    for (let i = 0; i < user.blogs.length; i++) {
      const blog = await Blog.findById(user.blogs[i])
        .populate("likes")
        .populate("comments")
        .populate("owner")
      blogs.push(blog)
    }
    res.status(200).json({
      success: true,
      blogs,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
