import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { userBlogsSliceReducer, userSlice } from "./reducers/user"
import { blogSliceReducer } from "./reducers/blog.js"
import { singleBlogSliceReducer } from "./reducers/blog.js"
const userReducer = userSlice.reducer
const rootReducer = combineReducers({
  user: userReducer,
  blogs: blogSliceReducer,
  singleBlog: singleBlogSliceReducer,
  userBlogs: userBlogsSliceReducer,
})
const store = configureStore({
  reducer: rootReducer,
})

export default store