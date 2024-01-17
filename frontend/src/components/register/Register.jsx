import React from "react"
import "./register.css"
import { Form } from "react-router-dom"

const Register = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>register page</h1>
      </div>
      <form className="container_form">
        <input
          className="input"
          type="text"
          placeholder="name"
        ></input>
        <input
          className="input"
          type="file"
          name="file"
          id="file"
        />
        <input
          className="input"
          type="email"
          placeholder="email"
        ></input>
        <input
          className="password"
          type="password"
          placeholder="password"
        ></input>
        <button type="submit">register</button>
      </form>
    </div>
  )
}

export default Register
