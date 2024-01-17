import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false,
}

export const userBlogsSlice = createSlice({
  name: "userBlogsSlice",
  initialState: {
    loading: false,
    userBlogs: null,
    error: null,
  },
  reducers: {
    userBlogrequest: (state, action) => {
      state.loading = true
    },
    userBlogsuccess: (state, action) => {
      state.loading = false
      state.userBlogs = action.payload
    },
    userBlogfailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    userProfilerequest: (state, action) => {
      state.loading = true
    },
    userProfilesuccess: (state, action) => {
      state.loading = false
      state.userBlogs = action.payload
    },
    userProfilefailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
export const {
  userBlogrequest,
  userBlogsuccess,
  userBlogfailure,
  userProfilerequest,
  userProfilesuccess,
  userProfilefailure,
} = userBlogsSlice.actions

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loginrequest: (state, action) => {
      state.loading = true
    },
    loginsuccess: (state, action) => {
      state.loading = false
      state.user = action.payload
      state.isAuthenticated = true
    },
    loginfailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
    },

    registerrequest: (state, action) => {
      state.loading = true
    },
    registersuccess: (state, action) => {
      state.loading = false
      state.user = action.payload
      state.isAuthenticated = true
    },
    registerfailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
    },

    loaduserrequest: (state, action) => {
      state.loading = true
    },
    loadusersuccess: (state, action) => {
      state.loading = false
      state.user = action.payload
      state.isAuthenticated = true
    },
    loaduserfailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
    },
  },
})
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
} = userSlice.actions

export const userSliceReducer = userSlice.reducer
export const userBlogsSliceReducer = userBlogsSlice.reducer
export const edituserSliceReducer = edituserSlice.reducer
