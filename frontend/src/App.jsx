import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/login/Login";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Register from "./pages/register/Register";
import { useDispatch, useSelector } from "react-redux";
import { loaduser } from "./actions/user";
import Home from "./pages/Home/Home";
import { getAllblogs } from "./actions/blog";
import SingleBlog from "./components/SingleBlogPage/SingleBlog";
import UserProfile from "./pages/User/UserProfile";
import EditBlogPage from "./components/SingleBlogPage/EditBlogPage";
import NewBlog from "./pages/NewBlog/NewBlog";
import ForgotPassword from "./pages/ForgotPassword";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
function App() {
  const dispatch = useDispatch();
  // const navigate = useNavigate()

  useEffect(() => {
    // Load user data only on the initial mount
    dispatch(loaduser());
    // console.log(JSON.stringify(localStorage.getItem("token")))
    // console.log("load effect")
  }, []);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  // console.log(user)
  return (
    <div>
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
            path="/forgot/:id/password"
            element={<ForgotPassword />}
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
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
