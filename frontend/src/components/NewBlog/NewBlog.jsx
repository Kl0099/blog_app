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
import "react-quill/dist/quill.snow.css" // Import the styles
import { useAlert } from "react-alert"
import { messagenull } from "../../reducers/blog"

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  // [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
]

const NewBlog = () => {
  const [newloading, setNewLoading] = useState(false)
  const { isAuthenticated, user, loading } = useSelector((state) => state.user)
  const { message } = useSelector((state) => state.singleBlog)
  // console.log(isAuthenticated, user)

  const alert = useAlert()
  // const { userId } = user && user.id

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
    setNewLoading(!newloading)

    dispatch(createBlog(title, description, image))
    // navigate(`/`)
    // window.location.reload()
  }
  useEffect(() => {
    if (message) {
      setNewLoading(!newloading)
      alert.success(message)
      dispatch(messagenull())
      setNewLoading(!newloading)
      navigate(`/`)
    }
  }, [message])
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        // border: "1px solid black",
      }}
      className="md:mt-8"
      // className=" border min-h-[90vh]"
    >
      {loading ? (
        <Loader />
      ) : (
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "collumn",
            alignItems: "center",
            justifyContent: "space-around",
            // border: "1px solid black",
          }}
          className=" border sm:min-h-fit"
        >
          {/* <Typography variant="h2">Create a new Blog</Typography> */}
          <form
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              gap: "20px",
              flexDirection: "column",
              // border: "1px solid black",
            }}
            onSubmit={handleSubmit}
          >
            {image === "" ? (
              <div className="min-h-[200px]"></div>
            ) : (
              <img
                // width={"100%"}
                // height={"200px"}
                src={image}
                alt="image"
                className=" w-full min-h-[200px]"
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
              // style={inputStyle}
              placeholder="Title...."
              type="text"
              name="title"
              id="title"
              onChange={(e) => {
                setTitle(e.target.value)
              }}
              className=" border-2 w-full p-2"
            />
            <ReactQuill
              modules={{
                toolbar: toolbarOptions,
              }}
              style={{
                // height: "300px",
                // width: "100%",
                border: "1px solid black",
              }}
              theme="snow" // You can customize the theme
              onChange={(value) => setDescription(value)}
              className="mb-8"
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={newloading}
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
