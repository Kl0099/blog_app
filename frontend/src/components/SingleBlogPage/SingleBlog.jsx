import React, { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Typography, Button } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import { Container, Box } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import User from "../User/User"
import { FaEdit } from "react-icons/fa"
import { FaComment } from "react-icons/fa"
import {
  commentaddandupdate,
  deleteBlog,
  deleteComment,
  getSingleBlog,
  likedAnsDisliked,
} from "../../actions/blog"
import "react-quill/dist/quill.snow.css" // Import the styles
import ReactQuill, { Quill } from "react-quill"
import { formatDistanceToNow } from "date-fns"
import DeleteIcon from "@mui/icons-material/Delete"
import CommentCard from "../commentcard/commentcard"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { messagenull } from "../../reducers/blog"
import { useAlert } from "react-alert"
// import ThumbUpIcon from "@material-ui/icons/ThumbUp"
// import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined"

const SingleBlog = () => {
  const { id } = useParams()
  const alert = useAlert()
  const navigate = useNavigate()
  // console.log(id)

  const [comment, setComment] = useState("")
  const [blog, setBlog] = useState(null)
  const [liked, setLiked] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSingleBlog(id))
    // console.log("single blog")
  }, [dispatch, id])
  const {
    deleteblogmessage,
    loading,
    singleBlog,
    message,
    error,
    likedmessage,
  } = useSelector((state) => state.singleBlog)
  const [commentloading, setCommetLoading] = useState(false)
  // console.log(singleBlog)
  // console.log("message : " + likedmessage)
  const { isAuthenticated, user } = useSelector((state) => state.user)

  const handlelike = () => {
    setLiked(!liked)
    dispatch(likedAnsDisliked(id))
    // console.log("value of like :" + liked)
  }
  const isValid =
    singleBlog && isAuthenticated === true && singleBlog.owner._id === user._id
  const handleformsubmit = (e) => {
    e.preventDefault()
    // console.log("comment", comment)
    dispatch(commentaddandupdate(id, comment))
    setCommetLoading(!commentloading)
  }
  const deletebloghandler = () => {
    dispatch(deleteBlog(id))
  }

  useEffect(() => {
    if (likedmessage) {
      dispatch(getSingleBlog(id))
      // dispatch(loaduser())
      // window.location.reload()
      // console.log("singlebog message : ", message)
      alert.success(likedmessage)
      dispatch(messagenull())
    }
    if (message) {
      setCommetLoading(!commentloading)
      dispatch(getSingleBlog(id))
      // console.log(singleBlog)
      alert.success(message)
      dispatch(messagenull())
    }
    if (deleteblogmessage) {
      alert.success(deleteblogmessage)
      dispatch(messagenull())
      navigate("/")
    }
    if (error) {
      console.log("comment card useeffect error: " + error)
    }
  }, [message, likedmessage, deleteblogmessage, error])
  useEffect(() => {
    setLiked(false)
    singleBlog &&
      user &&
      singleBlog.likes &&
      singleBlog.likes.forEach((item) => {
        if (item._id.toString() == user._id.toString()) {
          setLiked(true)
          // console.log("useEffect liked:" + liked)
        }
      })
  }, [singleBlog, user])

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className=" flex flex-col items-center border sm:w-full">
          <div className=" w-full relative">
            <img
              width="100%"
              height="600px"
              src={singleBlog && singleBlog.image.url}
              className=" object-cover relative w-full h-[600px]"
            />
          </div>
          <div className=" w-full flex bg-white p-2 justify-between items-center relative">
            <div className=" mb-20 shadow-lg min-w-[80%] relative mt-[-60px] bg-white ml-5 py-5 px-5 sm:w-full md:w-[60%] sm:text-xl">
              <Typography
                variant="h5"
                className=" font-small relative z-10 text-2xl sm:w-full sm:text-xl"
              >
                {singleBlog && singleBlog.title}
              </Typography>
              <div className=" sm:flex md:flex sm:p-3 gap-8 items-center mt-5 flex-wrap mb-3">
                <User
                  avatar={singleBlog && singleBlog.owner.avatar.url}
                  userId={singleBlog && singleBlog.owner._id}
                  name={singleBlog && singleBlog.owner.name}
                />
                {/* <Typography
                  variant="body2"
                  className="flex md:hidden mt-3"
                >
                  {singleBlog &&
                    new Date(singleBlog.updatedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                </Typography> */}
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
                    {isAuthenticated && (
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
              className="  prose min-w-[70%] z-10 relative"
              dangerouslySetInnerHTML={{ __html: singleBlog.description }}
            ></Typography>
          )}

          <div className=" flex items-start flex-col w-[60%] gap-5 mt-5 ">
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
                                  dispatch(deleteComment(id, item._id))
                                }}
                              >
                                <DeleteIcon />
                              </Button>
                            ) : null}
                          </div>
                        </div>

                        <Typography
                          variant="body2"
                          style={{ whiteSpace: "pre-line" }}
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
                      className="w-full h-[200px] rounded-sm border-slate-700 p-2  border-solid  mb-2"
                    ></textarea>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      disabled={commentloading}
                      className=" w-[100px] mt-5 m-5"
                    >
                      write
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleBlog
