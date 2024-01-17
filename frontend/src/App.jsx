import { useEffect, useState } from "react"
import "./App.css"
import Login from "./components/login/login"
import Navbar from "./components/navbar/Navbar"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Register from "./components/register/Register"
import { useDispatch, useSelector } from "react-redux"
import { loaduser } from "./actions/user"
import Home from "./components/Home/Home"
import { getAllblogs } from "./actions/blog"
import UserBlog from "./components/userBlog/UserBlog"
import SingleBlog from "./components/SingleBlogPage/SingleBlog"
import UserProfile from "./components/User/UserProfile"
import EditBlogPage from "./components/SingleBlogPage/EditBlogPage"
import NewBlog from "./components/NewBlog/NewBlog"
function App() {
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  useEffect(() => {
    // Load user data only on the initial mount
    dispatch(loaduser())
    // console.log("load effect")
  }, [dispatch])

  const { isAuthenticated, user } = useSelector((state) => state.user)
  // console.log(user)
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/blog/:id"
            element={<SingleBlog />}
          />
          <Route
            path="/blog/:id/edit"
            element={<EditBlogPage />}
          />
          <Route
            path="/user/:id"
            element={<UserProfile />}
          />
          <Route
            path="/newBlog"
            element={<NewBlog />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App