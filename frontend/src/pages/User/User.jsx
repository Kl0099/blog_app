import React from "react";
import { useParams, Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { formatDistanceToNow } from "date-fns";
import "./user.css";
const User = ({ avatar, name, userId, date = null }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Link to={`/user/${userId}`}>
        <Avatar
          className="avatar"
          src={avatar}
          alt={name}
          style={{ width: "40px", height: "40px" }}
        />
      </Link>
      <Link
        to={`/user/${userId}`}
        style={{ textDecoration: "none", color: "black", cursor: "pointer" }}
      >
        <Typography variant="body2">{name}</Typography>
        {date === null ? (
          <div></div>
        ) : (
          <Typography
            variant="body2"
            style={{ fontSize: "12px" }}
          >
            {formatDistanceToNow(new Date(date), { addSuffix: true })}
          </Typography>
        )}
      </Link>
    </div>
  );
};

export default User;
