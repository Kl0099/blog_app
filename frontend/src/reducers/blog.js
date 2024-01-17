import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  loading: false,
  blogs: null,
  error: null,
}
const singleBlogInitialState = {
  loading: false,
  singleBlog: null,
  error: null,
}
export const blogSlice = createSlice({
  name: "blogSlice",
  initialState,
  reducers: {
    blogRequest: (state) => {
      state.loading = true
    },
    blogSuccess: (state, action) => {
      state.loading = false
      state.blogs = action.payload
    },
    blogFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const singleBlogSlice = createSlice({
  name: "singleBlogSlice",
  initialState: singleBlogInitialState,
  reducers: {
    singleblogRequest: (state) => {
      state.loading = true
    },
    singleblogSuccess: (state, action) => {
      state.loading = false
      state.singleBlog = action.payload
    },
    singleblogFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    createblogRequest: (state) => {
      state.loading = true
    },
    createblogSuccess: (state, action) => {
      state.loading = false
      state.singleBlog = action.payload
    },
    createblogFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    singleBlogError: (state) => {
      state.error = null
    },
  },
})
export const editBlogSlice = createSlice({
  name: "editBlogSlice",
  initialState: singleBlogInitialState,
  reducers: {
    editblogRequest: (state) => {
      state.loading = true
    },
    editblogSuccess: (state, action) => {
      state.loading = false
      state.singleBlog = action.payload
    },
    editblogFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    singleBlogError: (state) => {
      state.error = null
    },
  },
})

export const { blogRequest, blogSuccess, blogFailure, clearError } =
  blogSlice.actions

export const {
  singleblogRequest,
  singleblogSuccess,
  singleblogFailure,
  singleBlogError,
} = singleBlogSlice.actions
export const { editblogFailure, editblogRequest, editblogSuccess } =
  editBlogSlice.actions

export const blogSliceReducer = blogSlice.reducer
export const singleBlogSliceReducer = singleBlogSlice.reducer
