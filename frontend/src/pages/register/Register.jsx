import React, { useEffect, useState } from "react";
import "./register.css";
import { Avatar, Button, Dialog, Typography, Container } from "@mui/material";
import { Form } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registeruser } from "../../actions/user";
import OtpInput from "react-otp-input";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const Register = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // console.log(isAuthenticated, user)

  const [Loading, setLoading] = useState(false);

  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registeruser(email, password, avatar, name, otp));
  };
  const verifyOtpSubmit = async (e) => {
    e.preventDefault();
    setToggle(!toggle);
    const { data } = await axios.post(
      `http://localhost:4000/api/v1/user/sendotp`,
      {
        email,
      },
      {
        withCredentials: true,
      }
    );
    console.log(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <div className=" h-full containerr md:w-full mt-12 sm:w-11/12">
      <div className="container_header">
        <Avatar
          src={
            "https://logos.flamingtext.com/Word-Logos/blog-design-sketch-name.png"
          }
          style={{ width: "150px", height: "150px" }}
        />
        <Avatar
          src={avatar}
          style={{ width: "100px", height: "100px" }}
        />
        <h1 className="container_title">register page</h1>
        <form
          encType="multipart/form-data"
          className="container_form"
          // onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            value={name}
            className="input w-full"
            type="text"
            placeholder="name"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <input
            accept="image/*"
            className="input_file md:w-full border"
            type="file"
            name="file"
            id="file"
            required
            onChange={handleImageChange}
          />
          <input
            className="input w-full"
            value={email}
            type="email"
            placeholder="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>

          <input
            type="password"
            value={password}
            className="password w-full"
            placeholder="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            disabled={loading}
            type="submit"
            variant="contained"
            color="secondary"
            style={{ marginTop: "20px", marginBottom: "20px", width: "100%" }}
            onClick={verifyOtpSubmit}
          >
            Register
          </Button>
        </form>
      </div>
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
          <Typography variant="h4">Verify your email</Typography>
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
              onClick={handleSubmit}
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

export default Register;
