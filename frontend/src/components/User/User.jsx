import React from "react"
import { useParams, Link } from "react-router-dom"
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"
import "./user.css"
const User = ({ avatar, name, userId }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <Link to={`/user/${userId}`}>
        <Avatar
          className="avatar"
          src={avatar}
          alt={name}
        />
      </Link>
      <Link
        to={`/user/${userId}`}
        style={{ textDecoration: "none", color: "black", cursor: "pointer" }}
      >
        <Typography variant="h6">{name}</Typography>
      </Link>
    </div>
  )
}

export default User
