import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import { useParams, useNavigate } from "react-router-dom";

import { Avatar, Button, Dialog, Container, Typography } from "@mui/material";
import { useAlert } from "react-alert";
const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const alert = useAlert();

  const loginHandlesubmit = async () => {
    setLoading(!loading);
    try {
      if (password !== confirmPassword) {
        alert("password does not match");
      } else {
        const response = await axios.post(
          "https://blogapp-lymy.onrender.com/api/v1/user/forgotpassword",
          {
            id: id,
            newPassword: password,
            confirmNewPassword: confirmPassword,
          },
          {
            withCredentials: true,
          }
        );
        setLoading(!loading);
        // console.log();/
        // const successmessage = response.data.success;
        const message = response.data.message;
        // console.log(successmessage);
        // console.log(message);
        alert.success(message);
        setLoading(!loading);
        navigate("/login");
        // if (!successmessage) {
        //   alert.error("error while updating password");
        // } else {
        //   alert.success(message);
        //   navigate("/login");
        // }
      }
    } catch (error) {
      console.log(error);
      // console.log(error.response.data);
      alert.error(error.response.data.message);
      setLoading(false);
    }
  };
  return loading === true ? (
    <Loader />
  ) : (
    <div className="containerr  md:w-full mt-12 sm:w-11/12 items-center">
      <header className="container_header">
        <Avatar
          src={
            "https://logos.flamingtext.com/Word-Logos/blog-design-sketch-name.png"
          }
          style={{ width: "150px", height: "150px" }}
        />
        <h1 className="container_title">change your password</h1>
        <Typography
          variant="body2 "
          className=" mx-4"
        >
          otp will expires within 5 minutes
        </Typography>
        <Typography
          variant="body2 "
          className=" mx-4"
        >
          please change password with in a time
        </Typography>

        <form
          onSubmit={loginHandlesubmit}
          className="container_form"
        >
          <input
            type="password"
            className="password"
            name="password"
            placeholder="newpassword"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete="current-password"
          />

          <input
            type="password"
            className="password"
            name="confirmpassword"
            placeholder="confirmpassword"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ marginTop: "20px" }}
          >
            submit
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ marginTop: "20px" }}
          >
            button
          </Button>
        </form>
      </header>
    </div>
  );
};

export default ForgotPassword;
