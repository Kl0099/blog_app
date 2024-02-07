import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Container, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import User from "../../pages/User/User";
import { FaEdit } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import {
  commentaddandupdate,
  deleteBlog,
  deleteComment,
  getSingleBlog,
  likedAnsDisliked,
} from "../../actions/blog";
import "react-quill/dist/quill.snow.css"; // Import the styles

import DeleteIcon from "@mui/icons-material/Delete";
import CommentCard from "../commentcard/commentcard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { messagenull } from "../../reducers/blog";
import { useAlert } from "react-alert";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Loader from "../Loader/Loader";
// import ThumbUpIcon from "@material-ui/icons/ThumbUp"
// import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined"

const SingleBlog = () => {
  const { id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();
  // console.log(id)

  const [comment, setComment] = useState("");
  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleBlog(id));
    // console.log("single blog")
  }, [dispatch, id]);
  const {
    deleteblogmessage,
    loading,
    singleBlog,
    message,
    error,
    likedmessage,
  } = useSelector((state) => state.singleBlog);
  const [commentloading, setCommetLoading] = useState(false);
  // console.log(singleBlog)
  // console.log("message : " + likedmessage)
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handlelike = () => {
    setLiked(!liked);
    dispatch(likedAnsDisliked(id));
    // console.log("value of like :" + liked)
  };
  const isValid =
    singleBlog && isAuthenticated === true && singleBlog.owner._id === user._id;
  const handleformsubmit = (e) => {
    e.preventDefault();
    // console.log("comment", comment)
    dispatch(commentaddandupdate(id, comment));
    setCommetLoading(!commentloading);
  };
  const deletebloghandler = () => {
    dispatch(deleteBlog(id));
  };

  useEffect(() => {
    if (likedmessage) {
      dispatch(getSingleBlog(id));
      // alert.success(likedmessage);
      dispatch(messagenull());
    }
    if (message) {
      setCommetLoading(!commentloading);
      dispatch(getSingleBlog(id));
      // console.log(singleBlog)
      alert.success(message);
      dispatch(messagenull());
      setCommetLoading(!commentloading);
    }
    if (deleteblogmessage) {
      setCommetLoading(!commentloading);
      alert.success(deleteblogmessage);
      dispatch(messagenull());
      setCommetLoading(!commentloading);
      navigate("/");
    }
    if (error) {
      console.log("comment card useeffect error: " + error);
    }
  }, [message, likedmessage, deleteblogmessage, error]);
  useEffect(() => {
    setLiked(false);
    singleBlog &&
      user &&
      singleBlog.likes &&
      singleBlog.likes.forEach((item) => {
        if (item._id.toString() == user._id.toString()) {
          setLiked(true);
          // console.log("useEffect liked:" + liked)
        }
      });
  }, [singleBlog, user]);

  return (
    <div className="mt-10">
      {loading ? (
        <Loader />
      ) : (
        <Container className=" flex flex-col items-center max-w-6xl mx-auto min-h-screen px-3 text-wrap overflow-hidden sm:overflow-auto sm:items-center">
          <div className="flex flex-col justify-center items-center relative">
            <CardMedia
              component="img"
              image={singleBlog && singleBlog.image.url}
              className=" relative  "
            />
          </div>
          <div className=" w-full flex bg-white p-2 justify-between items-center relative">
            <div className=" mb-20 shadow-lg min-w-[80%] relative sm:mt-[-60px] bg-white ml-5 py-5 px-5 sm:w-full md:w-[60%] sm:text-xl">
              <Typography
                variant="h6"
                className=" font-small relative z-10 text-2xl sm:w-full sm:text-xl"
              >
                {singleBlog && singleBlog.title}
              </Typography>
              <div className=" sm:flex md:flex sm:p-3 gap-8 items-center mt-5 flex-wrap mb-3">
                <User
                  avatar={
                    singleBlog &&
                    singleBlog.owner.avatar &&
                    singleBlog.owner.avatar.url
                  }
                  userId={singleBlog && singleBlog.owner._id}
                  name={singleBlog && singleBlog.owner.name}
                />

                <div>
                  <div className="flex gap-3 items-center flex-wrap md:justify-center ">
                    <Typography
                      variant="body2"
                      className="  md:flex"
                    >
                      {singleBlog &&
                        new Date(singleBlog.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "2-digit",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                    </Typography>
                    <Button className=" bg-transparent w-3 flex gap-4 mx-5">
                      <FaComment className="text-2xl" />

                      <span>
                        {singleBlog &&
                          singleBlog.comments &&
                          singleBlog.comments.length}
                      </span>
                    </Button>
                    {isAuthenticated ? (
                      <div className=" flex flex-col items-center gap-1 ml-3 ">
                        <Button
                          className=" bg-transparent w-3 flex gap-1 mx-5"
                          onClick={handlelike}
                        >
                          {singleBlog && user && liked ? (
                            <FavoriteIcon color="error" />
                          ) : (
                            <FavoriteBorderIcon color="warning" />
                          )}
                          <div className=" flex gap-1 items-center">
                            {singleBlog &&
                              singleBlog.likes &&
                              singleBlog.likes.length}{" "}
                            <span className=" text-black text-sm"> Like</span>
                          </div>
                        </Button>
                        {/* <div>{liked.toString()}</div> */}
                      </div>
                    ) : (
                      <Button
                        className=" bg-transparent w-3 flex gap-1 mx-2"
                        disabled={true}
                      >
                        <div className=" flex gap-1 items-center">
                          {singleBlog &&
                            singleBlog.likes &&
                            singleBlog.likes.length}{" "}
                          <span className=" text-black text-sm"> Like</span>
                        </div>
                      </Button>
                    )}

                    <div>
                      {isValid ? (
                        <div className=" flex g-3 items-center ml-5">
                          <Link to={`/blog/${id}/edit`}>
                            <FaEdit fontSize={30} />{" "}
                          </Link>
                          <div>
                            <Button
                              className=" bg-transparent bg-black"
                              onClick={deletebloghandler}
                            >
                              <DeleteIcon color="error" />{" "}
                            </Button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {singleBlog && (
            <Typography
              // className="sm:px-0 px-3 prose w-full whitespace-pre-line text-ellipsis z-10 relative"
              className="p-3 max-w-2xl mx-auto w-full prose "
              dangerouslySetInnerHTML={{ __html: singleBlog.description }}
            ></Typography>
          )}

          <div className=" flex items-start  sm:flex-col sm:items-start flex-col gap-5 mt-5 max-w-2xl mx-auto">
            <Typography variant="h6">
              comments ({singleBlog && singleBlog.comments.length})
            </Typography>
            {/* <CommentCard /> */}
            <div>
              <div style={{ padding: "5px" }}>
                {singleBlog &&
                singleBlog.comments &&
                singleBlog.comments.length > 0 ? (
                  <div>
                    {singleBlog.comments.map((item, index) => (
                      <div
                        key={index}
                        className=" mb-5 p-1 flex flex-col gap-5"
                      >
                        <div className="  flex justify-between items-center gap-3 w-fit">
                          <User
                            avatar={
                              item.user &&
                              item.user.avatar &&
                              item.user.avatar.url
                            }
                            name={item.user && item.user.name}
                            userId={item.user._id}
                            date={item && item.updatedAt}
                          />
                          <div>
                            {(user && item.user._id == user._id) || isValid ? (
                              <Button
                                variant="text"
                                color="inherit"
                                onClick={() => {
                                  dispatch(deleteComment(id, item._id));
                                }}
                              >
                                <DeleteIcon />
                              </Button>
                            ) : null}
                          </div>
                        </div>

                        <Typography
                          variant="body2"
                          className=" whitespace-pre-line border-b-2 pb-1"
                        >
                          {item.comment}
                        </Typography>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No revies yet</div>
                )}
              </div>
              <div>
                {isAuthenticated && (
                  <form
                    onSubmit={handleformsubmit}
                    className=" flex flex-col w-full mb-5"
                  >
                    <textarea
                      name="comment"
                      id="comment"
                      // cols="70"
                      // rows="8"
                      placeholder="add your review"
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full h-[200px] rounded-sm border-slate-700 p-2  border  mb-2"
                    ></textarea>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      className=" w-[100px] mt-5 m-5"
                    >
                      write
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default SingleBlog;
