import React, { useEffect, useState } from "react"
import User from "../User/User"
import { Link, useParams } from "react-router-dom"
import { Typography, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

import DeleteIcon from "@mui/icons-material/Delete"
import {
  commentaddandupdate,
  deleteComment,
  getSingleBlog,
} from "../../actions/blog"
import { loaduser } from "../../actions/user"
const CommentCard = () => {
  const [comment, setComment] = useState("")
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const { loading, singleBlog, message, error } = useSelector(
    (state) => state.singleBlog
  )
  const isValid =
    singleBlog && isAuthenticated === true && singleBlog.owner._id === user._id
  const dispatch = useDispatch()
  const { id } = useParams()
  const handleformsubmit = (e) => {
    e.preventDefault()
    dispatch(commentaddandupdate(id, comment))
  }
  // useEffect(() => {
  //   dispatch(getSingleBlog(id))
  // }, [dispatch])
  // useEffect(() => {
  //   if (message) {
  //     dispatch(getSingleBlog(id))
  //     // window.location.reload()
  //     console.log("comment card message : ", message)
  //   }
  //   if (error) {
  //     console.log(error)
  //   }
  // }, [message, error])
  // console.log("comment card : ", user)
  return (
    <div>
      {loading === true ? (
        <div>loading.....</div>
      ) : (
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
                          item.user && item.user.avatar && item.user.avatar.url
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
                  type="submit"
                  disabled={loading}
                >
                  write
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CommentCard
