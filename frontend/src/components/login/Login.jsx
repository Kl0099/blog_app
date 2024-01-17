import React, { useEffect, useState } from "react"
import axios from "axios"
// import { useHistory } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import "./login.css"
import { loginuser } from "../../actions/user.js"
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  // const history = useHistory()
  const navigate = useNavigate()

  const loginHandlesubmit = async (e) => {
    e.preventDefault()
    const success = await dispatch(loginuser(email, password))

    // console.log(success)
  }
  const { isAuthenticated, user } = useSelector((state) => state.user)
  console.log(isAuthenticated, user)
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])
  return (
    <div className="container">
      <header className="container_header">
        <h1 className="container_title">login page</h1>
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
            className="password"
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <button type="submit">login</button>
        </form>
      </header>
    </div>
  )
}

export default Login
