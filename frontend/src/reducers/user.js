import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  error: null,
  loading: false,
  editloading: false,
  message: null,
  editusermessage: null,
  token: localStorage.getItem("token")
    ? JSON.stringify(localStorage.getItem("token"))
    : null,
};
const userBloginitialState = {
  loading: false,
  userBlogs: null,
  error: null,
};
export const getuserSlice = createSlice({
  name: "getuserSlice",
  initialState: userBloginitialState,
  reducers: {
    userBlogrequest: (state, action) => {
      state.loading = true;
    },
    userBlogsuccess: (state, action) => {
      state.loading = false;
      state.userBlogs = action.payload;
    },
    userBlogfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userProfilerequest: (state, action) => {
      state.loading = true;
    },
    userProfilesuccess: (state, action) => {
      state.loading = false;
      state.userBlogs = action.payload;
    },
    userProfilefailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  userBlogrequest,
  userBlogsuccess,
  userBlogfailure,
  userProfilerequest,
  userProfilesuccess,
  userProfilefailure,
} = getuserSlice.actions;

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loginrequest: (state, action) => {
      state.loading = true;
    },
    loginsuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    loginfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logoutrequest: (state, action) => {
      state.loading = true;
    },
    logoutsuccess: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.message = action.payload;
      state.token = null;
    },
    logoutfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = true;
    },

    registerrequest: (state, action) => {
      state.loading = true;
    },
    registersuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    registerfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    loaduserrequest: (state, action) => {
      state.loading = true;
    },
    loadusersuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loaduserfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    edituserProfileRequest: (state, action) => {
      state.editloading = true;
    },
    edituserProfileSuccess: (state, action) => {
      state.loading = false;
      state.editusermessage = action.payload;
    },
    edituserProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    usermessagenull: (state) => {
      state.message = null;
      state.editusermessage = null;
    },
    usererrornull: (state) => {
      state.error = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});
export const {
  loginrequest,
  loginsuccess,
  loginfailure,
  registerrequest,
  registersuccess,
  registerfailure,
  loaduserrequest,
  loadusersuccess,
  loaduserfailure,
  edituserProfileRequest,
  edituserProfileSuccess,
  edituserProfileFailure,
  logoutrequest,
  logoutsuccess,
  logoutfailure,
  usermessagenull,
  usererrornull,
  setToken,
} = userSlice.actions;

export const userSliceReducer = userSlice.reducer;
export const userBlogsSliceReducer = getuserSlice.reducer;
// export const edituserSliceReducer = edituserSlice.reducer
