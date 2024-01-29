import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
// import { Container, Button, Avatar } from "@mui/material"
// import {} from "@mui/icons-material"
// import Typography from "@mui/material/Typography"
import "./navbar.css"
import "../../App.css"
import Loader from "../Loader/Loader"
import User from "../User/User"
import { getUser, loaduser, logoutUser } from "../../actions/user"
import { usermessagenull } from "../../reducers/user"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import AdbIcon from "@mui/icons-material/Adb"
import { useAlert } from "react-alert"

const pages = [
  { name: "profile", path: "/userprofile" },
  { name: "home", path: "/" },
  { name: "logout", path: "/logout" },
]
const settings = ["Profile", "Account", "Dashboard", "Logout"]

const Navbar = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { isAuthenticated, user, loading, message, editusermessage } =
    useSelector((state) => state.user)
  const LinkStyle = {
    textDecoration: "none",
    color: "black",
    cursor: "pointer",
  }
  const buttonStyle = {
    borderRadius: "20px",
  }
  // console.log(user)
  useEffect(() => {
    if (editusermessage) {
      dispatch(loaduser())
      dispatch(usermessagenull())
    }
  }, [editusermessage])
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleLogout = () => {
    dispatch(logoutUser())
  }
  useEffect(() => {
    if (message) {
      alert.success(message)
      dispatch(usermessagenull())
    }
  }, [message])

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <AppBar
          position="static"
          color="transparent"
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                // border: "1px solid",
              }}
            >
              {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <Avatar
                  src="https://logos.flamingtext.com/Word-Logos/blog-design-sketch-name.png"
                  style={{
                    width: "90px",
                    height: "90px",
                    // border: "1px solid black",
                    objectFit: "cover",
                    background: "white",
                  }}
                />
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  // color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                  className=" text-black"
                >
                  {/* {pages.map((page) => (
                    <MenuItem
                      key={page.name}
                      onClick={handleCloseNavMenu}
                    >
                      <Link
                        to={page.path}
                      >
                        {page.name}
                      </Link>
                    </MenuItem>
                  ))} */}
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to={"/"}>Home</Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to={"#"}>about</Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to={"#"}>ContactUs</Link>
                  </MenuItem>
                </Menu>
              </Box>
              {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                BLOGS
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  gap: 5,
                  // border: "1px solid",
                  justifyContent: "center",
                }}
              >
                <Link to={"/"}>Home</Link>
                <Link to={"#"}>about</Link>
                <Link to={"#"}>ContactUs</Link>
                {isAuthenticated && <Link to={"/newBlog"}>NewBlog</Link>}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <Button
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                    style={{
                      // border: "1px solid ",
                      padding: "5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "20px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "20px",
                      boxShadow: "0 6px 4px -2px rgb(0 0 0 / 0.1)",
                      paddingLeft: "7px",
                      paddingRight: "7px",
                    }}
                  >
                    <MenuIcon />

                    <Avatar
                      sx={{ width: "30px", height: "30px" }}
                      // alt="Remy Sharp"
                      src={
                        isAuthenticated && user && user.avatar
                          ? `${user.avatar.url}`
                          : "null"
                      }
                    />
                  </Button>
                </Tooltip>
                {isAuthenticated && user ? (
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {/* {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))} */}
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link
                        onClick={handleLogout}
                        className=" bg-transparent text-black"
                      >
                        Logout
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={`/user/${user._id}`}>Profile</Link>
                    </MenuItem>
                  </Menu>
                ) : (
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {/* {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))} */}
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={"/login"}>Login</Link>
                    </MenuItem>

                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={"/register"}>Signup</Link>
                    </MenuItem>
                  </Menu>
                )}
                {/* <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Link to={"/logout"}>Logout</Link>
                      </MenuItem>
                    
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Link to={"/logout"}>Profile</Link>
                      </MenuItem>
                    
                </Menu> */}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </div>
  )
}

export default Navbar
