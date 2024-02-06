import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Avatar, Button, Dialog } from "@mui/material";
import { Container, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import Blog from "../../components/blogs/Blog";
import {
  edituser,
  getBlogsOfUser,
  getUser,
  loaduser,
  logoutUser,
} from "../../actions/user";
import Loader from "../../components/Loader/Loader";
import { FaEdit } from "react-icons/fa";
import { useAlert } from "react-alert";
import { usererrornull, usermessagenull } from "../../reducers/user";

const UserProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    editloading,
    loading,
    user,
    isAuthenticated,
    message,
    editusermessage,
    error,
  } = useSelector((state) => state.user);

  const [toggle, setToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [avatar, setAvatar] = useState("");
  const [editload, setEditLoad] = useState(false);

  const alert = useAlert();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(edituser(email, name, newAvatar));
    setEditLoad(!editload);
  };
  useEffect(() => {
    dispatch(getUser(id));
  }, []);
  const { loading: getuserloading, userBlogs: getuser } = useSelector(
    (state) => state.getuser
  );
  // console.log(getuser)
  useEffect(() => {
    if (editusermessage) {
      setEditLoad(!editload);
      setToggle(!toggle);
      dispatch(getUser(id));
      // console.log(editusermessage)
      alert.success(editusermessage);
      // dispatch(mess)
      dispatch(usermessagenull());
    }
    if (error) {
      alert.error(error);
      dispatch(usererrornull());
      setToggle(!toggle);
    }
  }, [editusermessage, error]);
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
      setAvatar(user.avatar);
    }
  }, [user]);
  const handlelogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setNewAvatar(Reader.result);
      }
    };
  };

  return (
    <div>
      {getuserloading ? (
        <Loader />
      ) : (
        <div className=" mb-8 ">
          {getuser && (
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
                    alt={getuser && getuser.name}
                    style={{
                      width: "200px",
                      height: "200px",
                    }}
                    src={getuser && getuser.avatar.url}
                  ></Avatar>
                  <Typography variant="h4">
                    {getuser && getuser.name}
                  </Typography>
                  {isAuthenticated &&
                  user &&
                  getuser._id === id &&
                  user._id === id ? (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handlelogout}
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
                  ) : (
                    <div></div>
                  )}
                </Box>
              </Container>
              <Container maxWidth="xl">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid
                    container
                    spacing={{ xs: 1, md: 6 }}
                    columns={{ xs: 1, sm: 2, md: 12 }}
                  >
                    {getuser &&
                      getuser.blogs &&
                      getuser.blogs.map((blog, index) => (
                        <Grid
                          item
                          xs={1}
                          sm={1}
                          md={4}
                          key={getuser && blog._id ? blog._id : index}
                        >
                          <Blog
                            blogId={getuser && getuser.blogs && blog._id}
                            image={getuser && getuser.blogs && blog.image.url}
                            ownerId={getuser && blog._id}
                            ownername={getuser && blog.name}
                            owneravatar={
                              getuser && getuser.blogs && getuser.avatar.url
                            }
                            description={getuser && blog.description}
                            createdAt={getuser && blog.createdAt}
                            title={getuser && blog.title}
                          />
                        </Grid>
                      ))}
                  </Grid>
                  <div>
                    {getuser.blogs.length == 0 ? (
                      <Typography variant="h6">
                        You Does Not create any blog
                      </Typography>
                    ) : null}
                  </div>
                </Box>
              </Container>
              <Dialog
                open={toggle}
                onClose={() => setToggle(!toggle)}
                className=" flex items-center justify-center  "
              >
                <form
                  onSubmit={handleSubmit}
                  className=" border h-[60vh] flex items-center justify-evenly gap-5 flex-col w-[600px] min-w-[300px]"
                >
                  <Avatar
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                    src={newAvatar}
                  />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={handleImageChange}
                    className=" border md:w-1/2"
                  />
                  <input
                    style={{
                      padding: "10px",
                      // borderRadius: "20px",
                      outline: "none",
                      border: "1px solid rgba(0,0,0,1)",
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
                      outline: "none",
                      border: "1px solid rgba(0,0,0,1)",
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
                      disabled={editload}
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
      )}
    </div>
  );
};
export default UserProfile;
