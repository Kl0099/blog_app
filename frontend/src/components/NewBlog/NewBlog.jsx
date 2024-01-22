import React, { useEffect, useState } from "react"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Blog from "../blogs/Blog"
import { Container, Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../Loader/Loader"
import { createBlog } from "../../actions/blog"
import "react-quill/dist/quill.snow.css" // Import the styles
import ReactQuill, { Quill } from "react-quill"

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
]

const NewBlog = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user)
  // console.log(isAuthenticated, user)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const inputStyle = {
    padding: "10px",
    width: "100%",
    borderRadius: "20px",
    outline: "none",
    border: "1px solid rgba(0,0,0,1)",
  }
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const handleimagechange = (e) => {
    const file = e.target.files[0]
    const Reader = new FileReader()
    Reader.readAsDataURL(file)
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result)
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(createBlog(title, description, image))
    navigate(`/`)
    window.location.reload()
  }
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <Container
          maxWidth="lg"
          sx={{ height: "90vh" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {/* <Typography variant="h2">Create a new Blog</Typography> */}
          <form
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              gap: "20px",
              flexDirection: "column",
            }}
            onSubmit={handleSubmit}
          >
            {image === "" ? null : (
              <img
                width={"500px"}
                height={"400px"}
                src={image}
                style={{ borderRadius: "20px" }}
                alt="image"
              />
            )}

            <input
              accept="image/*"
              required
              type="file"
              name="file"
              id="file"
              onChange={handleimagechange}
            />

            <input
              required
              style={inputStyle}
              placeholder="Title...."
              type="text"
              name="title"
              id="title"
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
            <ReactQuill
              modules={{
                toolbar: toolbarOptions,
              }}
              style={{
                width: "100%",
                minHeight: "200px",
                borderRadius: "20px",
              }}
              theme="snow" // You can customize the theme
              onChange={(value) => setDescription(value)}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
              >
                Create
              </Button>
              <Button
                variant="primary"
                color="inherit"
                onClick={() => {
                  navigate(-1)
                }}
              >
                Back
              </Button>
            </div>
          </form>
        </Container>
      )}
    </div>
  )
}

export default NewBlog
