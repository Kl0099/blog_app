const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

async function sendEmailVarification(email, otp) {
  try {
    let response = await mailSender(
      email,
      "Verification Email from Blogapp24",
      `here your one time password ${otp}`
    );
    console.log("Email sent successfully");
  } catch (error) {
    console.log("error ocuured while sending email", error);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  await sendEmailVarification(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
