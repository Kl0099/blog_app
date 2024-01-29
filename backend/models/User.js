// const { required } = require("joi")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter a name"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "please enter unique email"],
  },
  password: {
    type: String,
    select: false,
  },
  avatar: {
    public_id: String,
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1695718948137-1f4d1d5ba889?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
})
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  try {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECRETE_JWT_TOKEN, {
    expiresIn: "7d",
  })
}
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("User", userSchema)
