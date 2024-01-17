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
import "../User/user.css"

const Blog = ({
  blogId,
  image,
  ownername,
  owneravatar,
  description,
  createdAt,
  title,
  ownerId,
}) => {
  const [toggle, setToggle] = useState(false)
  return (
    <div className=" flex ">
      <Container maxWidth="sm">
        <Card sx={{ maxWidth: 400 }}>
          <CardActionArea>
            <Link to={`/blog/${blogId}`}>
              <CardMedia
                component="img"
                height="180"
                image={image}
                alt="green iguana"
                className="avatar"
              />
            </Link>

            <CardContent>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <User
                  avatar={owneravatar}
                  userId={ownerId}
                  name={ownername}
                />

                <span style={{ fontSize: "14px" }}>
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                marginTop={"10px"}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                height="80px"
                position={"relative"}
                overflow={"hidden"}
              >
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
      <Dialog
        open={toggle}
        onClose={() => setToggle(!toggle)}
      >
        <div>hellow</div>
      </Dialog>
    </div>
  )
}

export default Blog
