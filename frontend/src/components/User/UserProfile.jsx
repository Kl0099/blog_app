import React, { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import Typography from "@mui/material/Typography"
import { Avatar, Button, Dialog } from "@mui/material"
import { Container, Box } from "@mui/material"
import Grid from "@mui/material/Grid"
import { useDispatch, useSelector } from "react-redux"
import Blog from "../blogs/Blog"
import {
  edituserprofile,
  getBlogsOfUser,
  getUser,
  loaduser,
} from "../../actions/user"
import Loader from "../Loader/Loader"
import { FaEdit } from "react-icons/fa"

const UserProfile = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()

  const { loading, user, isAuthenticated } = useSelector((state) => state.user)

  const [toggle, setToggle] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [avatar, setAvatar] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const Reader = new FileReader()
    Reader.readAsDataURL(file)
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result)
      }
    }
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Container>
            <Box
              height={"50vh"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
              gap={"20px"}
            >
              <Avatar
                style={{
                  width: "200px",
                  height: "200px",
                }}
                src={user && user.avatar.url}
              ></Avatar>
              <Typography variant="h4">{user && user.name}</Typography>
              {isAuthenticated && user._id === id ? (
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button
                    variant="contained"
                    color="error"
                  >
                    Log out
                  </Button>
                  <Button
                    onClick={() => setToggle(!toggle)}
                    variant="contained"
                    color="success"
                  >
                    Edit
                  </Button>
                </div>
              ) : null}
            </Box>
          </Container>
          <Container maxWidth="xl">
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 4 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {user &&
                  user.blogs.map((blog) => (
                    <Grid
                      item
                      xs={3}
                      sm={4}
                      md={4}
                      key={blog._id}
                    >
                      <Blog
                        blogId={blog._id}
                        image={user.blogs && blog.image.url}
                        ownerId={user && blog._id}
                        ownername={user && blog.name}
                        owneravatar={user.blogs && user.avatar.url}
                        description={blog.description}
                        createdAt={blog.createdAt}
                        title={blog.title}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Container>
          <Dialog
            open={toggle}
            onClose={() => setToggle(!toggle)}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                minWidth: "500px",
                height: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: "20px",
                flexDirection: "column",
              }}
            >
              <Avatar
                style={{
                  width: "100px",
                  height: "100px",
                }}
                src={avatar}
              />
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleImageChange}
              />
              <input
                style={{
                  padding: "10px",
                  borderRadius: "20px",
                  outline: "none",
                }}
                type="email"
                name="email"
                id="emial"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                style={{
                  padding: "10px",
                  borderRadius: "20px",
                  outline: "none",
                }}
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setToggle(!toggle)}
                >
                  Back
                </Button>
              </div>
            </form>
          </Dialog>
        </div>
      )}
    </div>
  )
}
export default UserProfile
