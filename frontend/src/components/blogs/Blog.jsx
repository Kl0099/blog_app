import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Dialog } from "@mui/material";
import { CardActionArea } from "@mui/material";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import User from "../../pages/User/User";

import { formatDistance, formatDistanceToNow } from "date-fns";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useDispatch, useSelector } from "react-redux";
import "../../pages/User/user.css";
import "./blog.css";

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
  const [toggle, setToggle] = useState(false);
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  // console.log(isAuthenticated, user)

  return (
    <div className=" flex ">
      <Container
        maxWidth="sm"
        className="  max-h-[600px]  sm:w-1/2   "
      >
        <Card
          // sx={{ maxWidth: 400, maxHeight: 500, minWidth: 300, minHeight: 400 }}
          className=" mt-4 rounded-md min-h-[400px] max-h-[300px] hover:shadow-2xl "
        >
          <CardActionArea>
            <Link to={`/blog/${blogId}`}>
              <CardMedia
                component="img"
                image={image}
                alt="green iguana"
                className="avatar max-h-[200px] min-h-[200px] object-fill"
                style={{ opacity: 0.9 }}
              />
            </Link>

            <CardContent className="card-bottom pb-2  flex flex-col justify-evenly items-start">
              <div className=" flex flex-wrap items-center justify-between w-full mb-2 ">
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

              <div
                // gutterBottom
                // component="div"
                // marginTop={"10px"}
                className="text-[24px] overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: 3,
                  // border: "1px solid black", // Adjust the number of lines you want to display
                  minHeight: "fit-content",
                  // fontSize: "24px",
                  // marginBottom: "20px",
                  // paddingBottom: "20px",
                }}
              >
                {title}
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    </div>
  );
};

export default Blog;
