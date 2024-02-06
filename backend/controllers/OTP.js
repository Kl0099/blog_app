const OTP = require("../models/OTP");
const User = require("../models/User");
const otpGenerator = require("otp-generator");

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    // const user = await User.findOne({ email: email });
    // if (user) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "User already exists",
    //   });
    // }

    var otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpDetails = await OTP.create({ email: email, otp: otp });
    console.log("otp send successfully and save in db", otpDetails);
    res.status(200).json({
      success: true,
      message: "otp send successfully",
      otpDetails,
    });
  } catch (error) {
    console.log("send OTP error : " + error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.otpVerification = async (req, res) => {
  try {
    const { otp } = req.body;
    console.log("otp veri : ", otp);
    const otpdetails = await OTP.find({ otp: otp })
      .sort({ createdAt: -1 })
      .limit(1);
    // console.log("otp details : ", otpdetails);
    if (otpdetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "otp expired or wrong otp",
      });
    }
    if (otpdetails[0].otp !== otp) {
      return res.status(404).json({
        success: false,
        message: "otp does not match",
      });
    }
    return res.status(200).json({
      success: true,
      message: "otp verified successfully",
      otpdetails,
    });
  } catch (error) {
    console.log("otp varifiaction error : " + error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.sendOtpForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    var otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpDetails = await OTP.create({ email: email, otp: otp });
    console.log("otp send successfully and save in db");
    console.log("otp details", otpDetails.otp);
    res.status(200).json({
      success: true,
      message: "otp send successfully",
    });
  } catch (error) {
    console.log("send OTP error : " + error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
