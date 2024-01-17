import axios from "axios"
import {
  loginrequest,
  loginsuccess,
  loginfailure,
  registerrequest,
  registersuccess,
  registerfailure,
  loaduserrequest,
  loadusersuccess,
  loaduserfailure,
  userBlogrequest,
  userBlogsuccess,
  userBlogfailure,
  userProfilerequest,
  userProfilesuccess,
  userProfilefailure,
  edituserProfileRequest,
  edituserProfilesuccess,
  edituserProfilefailure,
} from "../reducers/user.js" // Update the import path based on your actual file structure

export const loginuser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginrequest())
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    dispatch(loginsuccess(data.user))
  } catch (error) {
    console.log(error)
    dispatch(loginfailure(error.response.data.message))
  }
}

export const registeruser =
  (email, name, password, avatar) => async (dispatch) => {
    try {
      dispatch(registerrequest())
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/register",
        { email, password, name, avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      dispatch(registersuccess(data.user))
    } catch (error) {
      console.log(error)
      dispatch(registerfailure(error.response.data.message))
    }
  }

export const loaduser = () => async (dispatch) => {
  try {
    dispatch(loaduserrequest())
    const { data } = await axios.get("http://localhost:4000/api/v1/user/me", {
      withCredentials: true,
    })
    // console.log(data)
    dispatch(loadusersuccess(data.user))
  } catch (error) {
    console.log(error)
    dispatch(loaduserfailure(error.response.data.message))
  }
}
export const getBlogsOfUser = (id) => async (dispatch) => {
  try {
    dispatch(userBlogrequest())
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/userBlogs/${id}`,
      {
        withCredentials: true,
      }
    )
    dispatch(userBlogsuccess(data.blogs))
  } catch (error) {
    console.log(error)
    dispatch(userBlogfailure(error.response.data.message))
  }
}
export const getUser = (id) => async (dispatch) => {
  try {
    dispatch(userProfilerequest())
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/user/${id}`,
      {
        withCredentials: true,
      }
    )
    dispatch(userProfilesuccess(data.user))
  } catch (error) {
    console.log(error)
    dispatch(userProfilefailure(error.response.data.message))
  }
}
