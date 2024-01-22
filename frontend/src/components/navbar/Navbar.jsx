import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Container, Button, Avatar } from "@mui/material"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import Typography from "@mui/material/Typography"
import "./navbar.css"
import "../../App.css"
import Loader from "../Loader/Loader"
import User from "../User/User"

const Navbar = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user)
  const LinkStyle = {
    textDecoration: "none",
    color: "black",
    cursor: "pointer",
  }
  const buttonStyle = {
    borderRadius: "20px",
  }
  // console.log(user)
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="navbar">
          <div className="logo">
            <Avatar
              src={
                "https://logos.flamingtext.com/Word-Logos/blog-design-sketch-name.png"
              }
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          <div
            className="middle"
            style={{ fontSize: "22px" }}
          >
            <ul>
              <li>
                <Link
                  style={LinkStyle}
                  to={"/"}
                >
                  home
                </Link>
              </li>
              <li>
                <Link
                  style={LinkStyle}
                  to={"/about"}
                >
                  about
                </Link>
              </li>
              <li>
                <Link
                  style={LinkStyle}
                  to={"/about"}
                >
                  services
                </Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link
                    style={LinkStyle}
                    to={"/newBlog"}
                  >
                    New Blog
                  </Link>
                </li>
              )}

              {isAuthenticated && (
                <li style={{ fontSize: "22px", textDecoration: "none" }}>
                  <Link
                    to={"/logout"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="right">
            <ul>
              {!isAuthenticated && (
                <div
                  style={{
                    display: "flex",

                    gap: "20px",
                    borderRadius: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                  }}
                >
                  <li style={{ fontSize: "22px", textDecoration: "none" }}>
                    <Link
                      to={"/login"}
                      style={{ textDecoration: "none" }}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to={"/register"}>
                      <Button
                        variant="contained"
                        color="primary"
                        style={buttonStyle}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "5px",
                          }}
                        >
                          {" "}
                          <PersonAddIcon /> signUp
                        </div>
                      </Button>
                    </Link>
                  </li>
                </div>
              )}

              {isAuthenticated && user && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <User
                      userId={user && user._id}
                      name={user && user.name}
                      avatar={user && user.avatar && user.avatar.url}
                    />
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
