import axios from "axios";
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
  edituserProfileSuccess,
  edituserProfileFailure,
  logoutrequest,
  logoutsuccess,
  logoutfailure,
  setToken,
} from "../reducers/user.js"; // Update the import path based on your actual file structure

export const loginuser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginrequest());
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/login",
      { email, password },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", JSON.stringify(data.token));
    // console.log("local user ", data.user)
    // console.log("local token ", data.token)
    // console.log(data)
    // dispatch(setToken(data.token))
    dispatch(
      loginsuccess({
        user: data.user,
        message: data.message,
        token: data.token,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(loginfailure(error.response.data.message));
  }
};

export const registeruser =
  (email, password, avatar, name, otp) => async (dispatch) => {
    try {
      dispatch(registerrequest());
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/register",
        { email, password, name, avatar, otp },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(registersuccess(data.user));
    } catch (error) {
      console.log(error);
      dispatch(registerfailure(error.response.data.message));
    }
  };

export const loaduser = () => async (dispatch) => {
  try {
    dispatch(loaduserrequest());
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      console.log(user);
      dispatch(loadusersuccess(user));
    }

    const { data } = await axios.get("http://localhost:4000/api/v1/user/me", {
      withCredentials: true,
    });
    // console.log(data)
    dispatch(loadusersuccess(data.user));
  } catch (error) {
    console.log(error);
    dispatch(loaduserfailure(error.response.data.message));
  }
};
export const getBlogsOfUser = (id) => async (dispatch) => {
  try {
    dispatch(userBlogrequest());
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/userBlogs/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(userBlogsuccess(data.blogs));
  } catch (error) {
    console.log(error);
    dispatch(userBlogfailure(error.response.data.message));
  }
};
export const getUser = (id) => async (dispatch) => {
  try {
    dispatch(userProfilerequest());
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/user/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(userProfilesuccess(data.user));
  } catch (error) {
    console.log(error);
    dispatch(userProfilefailure(error.response.data.message));
  }
};
export const edituser = (email, name, avatar) => async (dispatch) => {
  try {
    dispatch(edituserProfileRequest());
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/user/updateprofile`,
      { email, name, avatar },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(edituserProfileSuccess(data.message));
  } catch (error) {
    console.log(error.message);
    dispatch(edituserProfileFailure(error.response.data.message));
  }
};
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(logoutrequest());
    const { data } = await axios.get("http://localhost:4000/api/v1/logout", {
      withCredentials: true,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logoutsuccess(data.message));
  } catch (error) {
    console.log(error);
    dispatch(logoutfailure(error.response.data.message));
  }
};
