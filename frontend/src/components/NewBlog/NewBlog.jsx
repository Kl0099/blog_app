import React, { useState } from "react"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Blog from "../blogs/Blog"
import { Container, Button } from "@mui/material"
import Typography from "@mui/material/Typography"
const NewBlog = () => {
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
  }
  return (
    <div
      style={{
        display: "flex",
      }}
    >
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
              width={"100%"}
              height={"200px"}
              src={image}
              style={{ borderRadius: "20px" }}
              alt="image"
            />
          )}

          <input
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

          <textarea
            required
            style={inputStyle}
            placeholder="Description........"
            name="description"
            id="description"
            cols="50"
            rows="20"
            onChange={(e) => {
              setDescription(e.target.value)
            }}
          ></textarea>

          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
            >
              Back
            </Button>
          </div>
        </form>
      </Container>
    </div>
  )
}

export default NewBlog
