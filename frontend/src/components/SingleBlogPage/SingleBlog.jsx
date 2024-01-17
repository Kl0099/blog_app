import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"
import { Container, Box } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import User from "../User/User"
import { FaEdit } from "react-icons/fa"
import { getSingleBlog } from "../../actions/blog"

const SingleBlog = () => {
  const { id } = useParams()
  // console.log(id)
  const [blog, setBlog] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSingleBlog(id))
    // console.log("single blog")
  }, [dispatch, id])
  const { loading, singleBlog } = useSelector((state) => state.singleBlog)
  const { isAuthenticated, user } = useSelector((state) => state.user)
  // console.log(singleBlog)
  useEffect(() => {
    setBlog(singleBlog)
  }, [singleBlog])

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

  const isValid =
    blog && isAuthenticated === true && blog.owner._id === user._id

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
              src={blog && blog.image.url}
              style={{
                objectFit: "cover",
                borderRadius: "20px",
                position: "relative",
              }}
            />
            <div
              style={{
                display: "flex",
                gap: "10px",
                position: "absolute",
                marginTop: "-70px",
                backgroundColor: "white",
                padding: "10px",
                justifyContent: "space-between",
              }}
            >
              <User
                avatar={blog && blog.owner.avatar.url}
                userId={blog && blog.owner._id}
                name={blog && blog.owner.name}
              />
            </div>
            {isValid ? (
              <Link to={`/blog/${id}/edit`}>
                <FaEdit fontSize={30} />{" "}
              </Link>
            ) : null}
          </div>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            position={"relative"}
            zIndex={10}
          >
            {blog && blog.title}
          </Typography>
          <Typography
            maxWidth={"60%"}
            marginTop={"20px"}
            position={"relative"}
            zIndex={10}
            variant="body1"
          >
            {blog && blog.description}
          </Typography>
        </div>
      )}
    </div>
  )
}

export default SingleBlog
