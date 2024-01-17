import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Container, Button, Avatar } from "@mui/material"
import Typography from "@mui/material/Typography"
import "./navbar.css"
import "../../App.css"
import Loader from "../Loader/Loader"

const Navbar = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user)
  const LinkStyle = {
    textDecoration: "none",
    color: "black",
    cursor: "pointer",
  }
  // console.log(user)
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="navbar">
          <div className="logo">logo</div>
          <div className="middle">
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
                <li>
                  <Link
                    style={LinkStyle}
                    to={"/signout"}
                  >
                    signout
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="right">
            <ul>
              {!isAuthenticated && (
                <div>
                  <li>
                    <Link to={"/login"}>login</Link>
                  </li>
                  <li>
                    <Link to={"/register"}>register</Link>
                  </li>
                </div>
              )}

              {isAuthenticated && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Avatar
                      src={user && user.avatar.url}
                      alt={user && user.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />
                    <span>{user && user.name}</span>
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
