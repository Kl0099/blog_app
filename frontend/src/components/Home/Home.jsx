import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllblogs } from "../../actions/blog"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Blog from "../blogs/Blog"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    // Load user data only on the initial mount
    dispatch(getAllblogs())

    console.log("home page ")
  }, [])
  const { loading, blogs } = useSelector((state) => state.blogs)
  // console.log(loading)
  // console.log(blogs)
  return (
    <div>
      <Container className=" border text-center mb-2 md:h-[40vh] items-center flex flex-col">
        <div>
          <Typography variant="h2">Our Fresh Blogs</Typography>
          <Typography
            variant="body1"
            textAlign={"center"}
            marginTop={"30px"}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
            doloremque maiores accusantium dolorem dicta cupiditate eligendi
            nulla dolorum et rerum. Lorem ipsum dolor,usantium dolorem dicta
            cupiditate eligendi nulla dolorum et rerum.
          </Typography>
        </div>
      </Container>
      <Container
        maxWidth="xl"
        className="mt-4 border"
      >
        {loading !== null ? (
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 0, md: 6 }}
              columns={{ xs: 1, sm: 2, md: 12 }}
              className=" "
            >
              {blogs &&
                blogs.map((blog) => (
                  <Grid
                    item
                    xs={1}
                    sm={1}
                    md={4}
                    key={blog._id}
                    className=" "
                  >
                    <Blog
                      blogId={blog._id}
                      image={blog.image.url}
                      ownerId={blog && blog.owner._id}
                      ownername={blog.owner.name}
                      owneravatar={blog.owner.avatar.url}
                      description={blog.description}
                      createdAt={blog.createdAt}
                      title={blog.title}
                      likes={blog && blog.likes}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        ) : (
          <div>no blogs</div>
        )}
      </Container>
    </div>
  )
}

export default Home
