import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  blogs: null,
  error: null,
};
const singleBlogInitialState = {
  loading: false,
  singleBlog: null,
  error: null,
  message: null,
  deleteblogmessage: null,
  likedmessage: null,
  likedError: null,
  editblogmessage: null,
};
const editBlogInitialState = {
  loading: false,
  editedBlog: null,
  error: null,
  message: null,
};
export const blogSlice = createSlice({
  name: "blogSlice",
  initialState,
  reducers: {
    blogRequest: (state) => {
      state.loading = true;
    },
    blogSuccess: (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
    },
    blogFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const singleBlogSlice = createSlice({
  name: "singleBlogSlice",
  initialState: singleBlogInitialState,
  reducers: {
    singleblogRequest: (state) => {
      state.loading = true;
    },
    singleblogSuccess: (state, action) => {
      state.loading = false;
      state.singleBlog = action.payload;
    },
    singleblogFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createblogRequest: (state) => {
      state.loading = true;
    },
    createblogSuccess: (state, action) => {
      state.loading = false;
      state.singleBlog = action.payload;
    },
    createblogFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    likeblogRequest: (state) => {
      state.loading = true;
    },
    likeblogSuccess: (state, action) => {
      state.loading = false;
      state.likedmessage = action.payload;
    },
    likeblogFailure: (state, action) => {
      state.loading = false;
      state.likedError = action.payload;
    },
    addCommentblogRequest: (state) => {
      state.loading = true;
    },
    addCommentblogSuccess: (state, action) => {
      // console.log("reducer starts : ")
      state.loading = false;
      state.message = action.payload;
      // console.log("action: " + action.payload)
      // console.log("state : " + state.message)
    },
    addCommentblogFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletCommentblogRequest: (state) => {
      state.loading = true;
    },
    deletCommentblogSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteCommentblogFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletblogRequest: (state) => {
      state.loading = true;
    },
    deletblogSuccess: (state, action) => {
      state.loading = false;
      state.deleteblogmessage = action.payload;
    },
    deleteblogFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    singleBlogError: (state) => {
      state.error = null;
    },
    setmessage: (state, action) => {
      state.message = action.payload;
    },
    messagenull: (state) => {
      state.message = null;
      state.likedmessage = null;
      state.deleteblogmessage = null;
      state.editblogmessage = null;
    },
  },
});

export const {
  singleblogRequest,
  singleblogSuccess,
  singleblogFailure,
  singleBlogError,
  createblogRequest,
  createblogSuccess,
  createblogFailure,
  likeblogRequest,
  likeblogSuccess,
  likeblogFailure,
  addCommentblogFailure,
  addCommentblogRequest,
  addCommentblogSuccess,
  deletCommentblogRequest,
  deletCommentblogSuccess,
  deleteCommentblogFailure,
  deletblogRequest,
  deletblogSuccess,
  deleteblogFailure,
  messagenull,
  setmessage,
} = singleBlogSlice.actions;

export const editBlogSlice = createSlice({
  name: "editBlogSlice",
  initialState: editBlogInitialState,
  reducers: {
    editblogRequest: (state) => {
      state.loading = true;
    },
    editblogSuccess: (state, action) => {
      state.loading = false;
      state.editedBlog = action.payload.singleBlog;
      state.message = action.payload.message;
    },
    editblogFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    editblogerrornull: (state) => {
      state.error = null;
    },
    editblogmessagenull: (state) => {
      state.message = null;
    },
  },
});

export const { blogRequest, blogSuccess, blogFailure, clearError } =
  blogSlice.actions;

export const {
  editblogFailure,
  editblogRequest,
  editblogSuccess,
  editblogerrornull,
  editblogmessagenull,
} = editBlogSlice.actions;

export const blogSliceReducer = blogSlice.reducer;
export const singleBlogSliceReducer = singleBlogSlice.reducer;
export const editBlogSliceReducer = editBlogSlice.reducer;
