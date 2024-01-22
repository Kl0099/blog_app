import React, { useEffect, useState } from "react"
import "./register.css"
import { Avatar, Button, Dialog } from "@mui/material"
import { Form } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { registeruser } from "../../actions/user"

const Register = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, user, loading } = useSelector((state) => state.user)
  const navigate = useNavigate()
  // console.log(isAuthenticated, user)

  const [name, setName] = useState("")
  const [avatar, setAvatar] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registeruser(email, password, avatar, name))
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const Reader = new FileReader()
    Reader.readAsDataURL(file)
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result)
      }
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated])
  return (
    <div className="container">
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
        <h1>register page</h1>
        <form
          encType="multipart/form-data"
          className="container_form"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            value={name}
            className="input"
            type="text"
            placeholder="name"
            onChange={(e) => {
              setName(e.target.value)
            }}
          ></input>
          <input
            accept="image/*"
            className="input_file"
            type="file"
            name="file"
            id="file"
            onChange={handleImageChange}
          />
          <input
            className="input"
            value={email}
            type="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          ></input>

          <input
            type="password"
            value={password}
            className="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />

          <Button
            disabled={loading}
            type="submit"
            variant="contained"
            color="secondary"
            style={{ marginTop: "20px" }}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Register
