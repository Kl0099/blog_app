import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { loginuser } from "../../actions/user.js";
import { Avatar, Button, Dialog, Container, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { usererrornull, usermessagenull } from "../../reducers/user.js";
import OtpInput from "react-otp-input";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase.js";

const Login = () => {
  const auth = getAuth(app);
  const alert = useAlert();
  const [toggle, setToggle] = useState(false);

  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const history = useHistory()
  const navigate = useNavigate();

  const { error, isAuthenticated, user, message } = useSelector(
    (state) => state.user
  );

  const [showPassword, setShowPassword] = useState(false);
  const loginHandlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the login request is initiated

    dispatch(loginuser(email, password));

    // Reset loading state after the login attempt
  };
  // console.log(isAuthenticated, user)
  const handleForgot = async () => {
    if (email == "") {
      // window.alert("Please enter your email");
      return alert.error("Please enter your email");
    } else {
      setLoading(!loading);
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/forgotpassword/sendotp",
        { email },
        {
          withCredentials: true,
        }
      );
      setLoading(!loading);
      console.log(response);
      setToggle(!toggle);
      alert.info(response.data.message);
    }
  };
  const handleotpsubmit = async () => {
    try {
      setLoading(!loading);
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/forgotpassword/verifyotp",
        { otp },
        {
          withCredentials: true,
        }
      );
      const otpId = response.data.otpdetails[0]._id;

      navigate(`/forgot/${otpId}/password`);
    } catch (error) {
      // console.log(error);
      alert.error(error.response.data.message);
      alert.error("try again..");
    }
  };
  const googleAuth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, provider);
      // console.log(result);
      // console.log(result.user.displayName);
      // console.log(result.user.email);

      dispatch(loginuser(result.user.email, null));
    } catch (error) {
      console.log("google : ", error);
    }
  };
  useEffect(() => {
    if (message) {
      setLoading(false);
      // alert.success(message);
      dispatch(usermessagenull());
      navigate("/");
    }
    if (error) {
      setLoading(false);
      alert.success(error);
      dispatch(usererrornull());
    }
  }, [message, error]);
  return (
    <div className="containerr  md:w-full mt-12 sm:w-11/12 items-center">
      <header className="container_header">
        <Avatar
          src={
            "https://logos.flamingtext.com/Word-Logos/blog-design-sketch-name.png"
          }
          style={{ width: "150px", height: "150px" }}
        />
        <h1 className="container_title">Login page</h1>
        <form
          onSubmit={loginHandlesubmit}
          className="container_form mb-8"
        >
          <input
            className="input w-full"
            type="email"
            name="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            type="password"
            className="password w-full"
            name="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete="current-password"
          />
          <div className="  w-full">
            <Typography
              textAlign={"right"}
              onClick={handleForgot}
              className=" cursor-pointer text-left hover:text-black text-slate-400 "
              variant="body2"
            >
              Forgot password?
            </Typography>
          </div>

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={loading}
            sx={{ marginTop: "20px", width: "100%" }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            style={{
              marginTop: "20px",
              width: "100%",
              textTransform: "none",
              outline: "1px solid grey",
            }}
            onClick={googleAuth}
          >
            <span className=" pr-1 text-xl focus:outline-gray-300 focus:outline-2">
              <FcGoogle />
            </span>
            Google
          </Button>
        </form>
      </header>
      <Dialog
        open={toggle}
        // onClose={() => setToggle(!toggle)}
        className=" flex items-center justify-center"
      >
        <Container
          className=" border h-[60vh] flex items-center justify-center gap-5 flex-col max-w-[600px] "
          sx={{
            maxWidth: "600px",
            height: "60vh",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h4"
            className=" text-center"
          >
            Verify your email
          </Typography>
          <Typography
            variant="body2"
            className=" text-center"
          >
            please enter 6-digit verification code that was sent to your email{" "}
          </Typography>
          <Typography
            variant="body2"
            className=" text-center"
          >
            this code is valid for 5 minutes
          </Typography>

          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className=" mx-2"></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              borderBottom: "1px solid black",
            }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleotpsubmit}
            >
              submit
            </Button>
            <Button onClick={() => setToggle(!toggle)}>Back</Button>
          </div>
        </Container>
      </Dialog>
    </div>
  );
};

export default Login;
