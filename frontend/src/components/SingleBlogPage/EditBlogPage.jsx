import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams, useNavigate } from "react-router-dom"
import { getSingleBlog, updateBlog } from "../../actions/blog"
import "react-quill/dist/quill.snow.css" // Import the styles
import { Container, Button } from "@mui/material"
import Typography from "@mui/material/Typography"

import Loader from "../Loader/Loader"
import ReactQuill, { Quill } from "react-quill"
import { useAlert } from "react-alert"
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
const EditBlogPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  // console.log(id)
  const dispatch = useDispatch()
  // const id = params.id

  const alert = useAlert()
  const [newloading, setNewLoading] = useState(false)

  useEffect(() => {
    dispatch(getSingleBlog(id))
  }, [dispatch, id])
  const { loading, singleBlog } = useSelector((state) => state.singleBlog)
  // console.log(singleBlog)
  const [title, setTitle] = useState("")
  const [description, setdescription] = useState("")

  const [image, setImage] = useState("")
  useEffect(() => {
    // Check if singleBlog is not null before accessing its properties
    if (singleBlog) {
      setTitle(singleBlog.title || "")
      setdescription(singleBlog.description || "")
    }
  }, [singleBlog])
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
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateBlog(title, description, id))
    navigate(`/blog/${id}`)
  }
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
            onSubmit={submitHandler}
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
              value={title}
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
              onChange={(value) => setdescription(value)}
              className="mb-8"
              value={description}
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

export default EditBlogPage
