import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Typography, Button } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import { Container, Box } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import User from "../User/User"
import { FaEdit } from "react-icons/fa"
import {
  commentaddandupdate,
  deleteComment,
  getSingleBlog,
} from "../../actions/blog"
import "react-quill/dist/quill.snow.css" // Import the styles
import ReactQuill, { Quill } from "react-quill"
import { formatDistanceToNow } from "date-fns"
import DeleteIcon from "@mui/icons-material/Delete"
import CommentCard from "../commentcard/commentcard"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"

const SingleBlog = () => {
  const { id } = useParams()
  // console.log(id)

  const [comment, setComment] = useState("")
  const [blog, setBlog] = useState(null)
  const [liked, setLiked] = useState(false)
  const dispatch = useDispatch()
  const handleformsubmit = (e) => {
    e.preventDefault()
    console.log("comment", comment)
    dispatch(commentaddandupdate(id, comment))
  }
  useEffect(() => {
    dispatch(getSingleBlog(id))
    // console.log("single blog")
  }, [dispatch])
  const { loading, singleBlog, message, error } = useSelector(
    (state) => state.singleBlog
  )
  // console.log(singleBlog)
  const { isAuthenticated, user } = useSelector((state) => state.user)
  // console.log(singleBlog)
  // useEffect(() => {
  //   setBlog(singleBlog)
  // }, [singleBlog])
  // console.log(liked)
  // const fetchData = async () => {
  //   // Now, you can safely work with the blogs
  //   let blog = blogs.map((blog) => {
  //     if (blog._id === id) {
  //       return blog
  //     }
  //     return null
  //   })

  //   // Filter out null values from the map result
  //   blog = blog.filter((item) => item !== null)
  //   setBlog(blog[0])
  //   console.log(blog)
  // }
  const handlelike = () => {
    setLiked(!liked)
    console.log(liked)
  }
  const isValid =
    singleBlog && isAuthenticated === true && singleBlog.owner._id === user._id

  useEffect(() => {
    if (message) {
      dispatch(getSingleBlog(id))
      // dispatch(loaduser())
      // window.location.reload()
      console.log("singlebog message : ", message)
    }
    if (error) {
      console.log("comment card useeffect error: " + error)
    }
  }, [message, id, dispatch, error])

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", position: "relative" }}>
            <img
              width="100%"
              height="600px"
              src={singleBlog && singleBlog.image.url}
              style={{
                objectFit: "cover",
                borderRadius: "20px",
                position: "relative",
              }}
            />
            <div
              style={{
                display: "flex",
                gap: "20px",
                position: "absolute",
                marginTop: "-70px",
                backgroundColor: "white",
                padding: "10px",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <User
                avatar={singleBlog && singleBlog.owner.avatar.url}
                userId={singleBlog && singleBlog.owner._id}
                name={singleBlog && singleBlog.owner.name}
              />
            </div>
            {isValid ? (
              <div>
                <Link to={`/blog/${id}/edit`}>
                  <FaEdit fontSize={30} />{" "}
                </Link>
                <Button
                  style={{
                    backgroundColor: "transparent",
                  }}
                  onClick={() => {
                    setLiked(!liked)
                  }}
                >
                  {liked ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </Button>
                <div>{singleBlog.likes.length}</div>
              </div>
            ) : null}
          </div>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            position={"relative"}
            zIndex={10}
          >
            {singleBlog && singleBlog.title}
          </Typography>

          <Typography
            maxWidth={"60%"}
            marginTop={"20px"}
            position={"relative"}
            zIndex={10}
            variant="body1"
            whiteSpace={"pre-line"}
          >
            {singleBlog && (
              <div
                dangerouslySetInnerHTML={{ __html: singleBlog.description }}
              ></div>
            )}
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              width: "40%",
              gap: "20px",
              marginTop: "20px",
            }}
          >
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
                        style={{
                          marginBottom: "10px",
                          padding: "5px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
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
                    // onSubmit={handleformsubmit}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "min-contant",
                    }}
                  >
                    <textarea
                      name="comment"
                      id="comment"
                      cols="70"
                      rows="15"
                      placeholder="add your review"
                      style={{ paddingLeft: "10px" }}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ width: "40%", marginTop: "20px" }}
                      // type="submit"
                      disabled={loading}
                      onClick={handleformsubmit}
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
