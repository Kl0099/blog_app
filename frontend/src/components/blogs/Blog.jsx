import React, { useState } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"
import { Dialog } from "@mui/material"
import { CardActionArea } from "@mui/material"
import Container from "@mui/material/Container"
import { Link } from "react-router-dom"
import User from "../User/User"

import { formatDistance, formatDistanceToNow } from "date-fns"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"

import { useDispatch, useSelector } from "react-redux"
import "../User/user.css"
import "./blog.css"

const Blog = ({
  blogId,
  image,
  ownername,
  owneravatar,
  description,
  createdAt,
  title,
  ownerId,
  likes,
}) => {
  const [toggle, setToggle] = useState(false)
  const { isAuthenticated, user, loading } = useSelector((state) => state.user)
  // console.log(isAuthenticated, user)

  return (
    <div className=" flex ">
      <Container maxWidth="sm">
        <Card sx={{ maxWidth: 400, maxHeight: 500, minWidth: 300 }}>
          <CardActionArea>
            <Link to={`/blog/${blogId}`}>
              <CardMedia
                component="img"
                height="200"
                image={image}
                alt="green iguana"
                className="avatar"
                style={{ opacity: 0.9 }}
              />
            </Link>

            <CardContent className="card-bottom">
              <div className="card-contant">
                <User
                  avatar={owneravatar}
                  userId={ownerId}
                  name={ownername}
                />

                <span style={{ fontSize: "14px" }}>
                  {/* {new Date(createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })} */}
                  {formatDistanceToNow(new Date(createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div className="cart-text">
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  marginTop={"10px"}
                  className="cart-title"
                >
                  <div dangerouslySetInnerHTML={{ __html: title }}></div>
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  height="80px"
                  position={"relative"}
                  overflow={"hidden"}
                  style={{ whiteSpace: "pre-line" }}
                >
                  <div dangerouslySetInnerHTML={{ __html: description }}></div>
                  {/* {(description.length / 1000).toFixed(2)} */}
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    </div>
  )
}

export default Blog
