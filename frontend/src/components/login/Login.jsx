import React, { useEffect, useState } from "react"
import axios from "axios"
// import { useHistory } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import "./login.css"
import { loginuser } from "../../actions/user.js"
import { Avatar, Button, Dialog } from "@mui/material"
import { useAlert } from "react-alert"
const Login = () => {
  const alert = useAlert()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  // const history = useHistory()
  const navigate = useNavigate()

  const { isAuthenticated, user, message } = useSelector((state) => state.user)

  const [showPassword, setShowPassword] = useState(false)
  const loginHandlesubmit = async (e) => {
    e.preventDefault()
    setLoading(true) // Set loading to true when the login request is initiated

    const success = dispatch(loginuser(email, password))

    // Check if login was successful
    if (success) {
      // Navigate to home page if login successful
      navigate("/")
      alert.success("Login successful")
    }

    setLoading(false) // Reset loading state after the login attempt
  }
  // console.log(isAuthenticated, user)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])
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
          className="container_form"
        >
          <input
            className="input"
            type="email"
            name="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />

          <input
            type="password"
            className="password"
            name="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ marginTop: "20px" }}
            disabled={loading}
          >
            Login
          </Button>
        </form>
      </header>
    </div>
  )
}

export default Login
