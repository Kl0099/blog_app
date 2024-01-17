import axios from "axios"
import {
  blogFailure,
  blogRequest,
  blogSuccess,
  editblogFailure,
  editblogRequest,
  editblogSuccess,
  singleblogFailure,
  singleblogRequest,
  singleblogSuccess,
} from "../reducers/blog"

export const getAllblogs = () => async (dispatch) => {
  try {
    dispatch(blogRequest())
    const { data } = await axios.get("http://localhost:4000/api/v1/Blog", {
      withCredentials: true,
    })
    // console.log(data)
    dispatch(blogSuccess(data.blog))
  } catch (error) {
    console.log(error)
    dispatch(blogFailure(error.response.data.message))
  }
}
export const getSingleBlog = (id) => async (dispatch) => {
  try {
    dispatch(singleblogRequest())
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/BlogSingle/${id}`,
      {
        withCredentials: true,
      }
    )
    dispatch(singleblogSuccess(data.blog))
    // console.log(data)
  } catch (error) {
    console.log(error)
    dispatch(singleblogFailure(error.response.data.message))
  }
}
export const updateBlog = (title, description, id) => async (dispatch) => {
  try {
    dispatch(editblogRequest())

    const { data } = await axios.put(
      `http://localhost:4000/api/v1/Blog/${id}`,
      {
        title,
        description,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    dispatch(editblogSuccess(data.blog))
  } catch (error) {
    console.error(error)
    dispatch(
      editblogFailure(
        error.response ? error.response.data.message : "An error occurred"
      )
    )
  }
}
