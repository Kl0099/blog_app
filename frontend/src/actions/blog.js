import axios from "axios";
import {
  addCommentblogFailure,
  addCommentblogRequest,
  addCommentblogSuccess,
  blogFailure,
  blogRequest,
  blogSuccess,
  createblogFailure,
  createblogRequest,
  createblogSuccess,
  deletCommentblogRequest,
  deletCommentblogSuccess,
  deletblogRequest,
  deletblogSuccess,
  deleteCommentblogFailure,
  deleteblogFailure,
  editblogFailure,
  editblogRequest,
  editblogSuccess,
  likeblogFailure,
  likeblogRequest,
  likeblogSuccess,
  setmessage,
  singleblogFailure,
  singleblogRequest,
  singleblogSuccess,
} from "../reducers/blog";

export const getAllblogs = () => async (dispatch) => {
  try {
    dispatch(blogRequest());
    const { data } = await axios.get(
      "https://blogapp-lymy.onrender.com/api/v1/Blog",
      {
        withCredentials: true,
      }
    );
    // console.log(data)
    dispatch(blogSuccess(data.blog));
  } catch (error) {
    console.log(error);
    dispatch(blogFailure(error.response.data.message));
  }
};
export const getSingleBlog = (id) => async (dispatch) => {
  try {
    dispatch(singleblogRequest());
    const { data } = await axios.get(
      `https://blogapp-lymy.onrender.com/api/v1/BlogSingle/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(singleblogSuccess(data.blog));
    // console.log(data)
  } catch (error) {
    console.log(error);
    dispatch(singleblogFailure(error.response.data.message));
  }
};
export const updateBlog =
  (title, description, id, image) => async (dispatch) => {
    try {
      dispatch(editblogRequest());

      const { data } = await axios.put(
        `https://blogapp-lymy.onrender.com/api/v1/Blog/${id}`,
        {
          title,
          description,
          image,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(
        editblogSuccess({ message: data.message, singleBlog: data.blog })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        editblogFailure(
          error.response ? error.response.data.message : "An error occurred"
        )
      );
    }
  };
export const createBlog = (title, description, image) => async (dispatch) => {
  try {
    dispatch(createblogRequest());
    const { data } = await axios.post(
      "https://blogapp-lymy.onrender.com/api/v1/Blog/create",
      { title: title, description: description, image: image },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(createblogSuccess(data.blog));
    dispatch(setmessage(data.message));
  } catch (error) {
    console.log(error);
    dispatch(createblogFailure(error.response.data.message));
  }
};
export const commentaddandupdate = (id, comment) => async (dispatch) => {
  try {
    dispatch(addCommentblogRequest());
    const { data } = await axios.put(
      `https://blogapp-lymy.onrender.com/api/v1/Blog/comment/${id}`,
      { comment },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(addCommentblogSuccess(data.message));
    console.log("action file :" + data.message);
  } catch (error) {
    console.log(error);
    dispatch(addCommentblogFailure(error.response.data.message));
  }
};
export const deleteComment = (id, commentId) => async (dispatch) => {
  try {
    dispatch(deletCommentblogRequest());
    const { data } = await axios.delete(
      `https://blogapp-lymy.onrender.com/api/v1/Blog/comment/${id}`,

      {
        data: { commentId },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(deletCommentblogSuccess(data.message));
  } catch (error) {
    console.log("action folder : ", error);
    dispatch(deleteCommentblogFailure(error.response.data.message));
  }
};
export const likedAnsDisliked = (id) => async (dispatch) => {
  try {
    dispatch(likeblogRequest());
    const { data } = await axios.get(
      `https://blogapp-lymy.onrender.com/api/v1/Blog/${id}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(likeblogSuccess(data.message));
  } catch (error) {
    console.log("like error ", error);
    dispatch(likeblogFailure(error.response.data.message));
  }
};
export const deleteBlog = (id) => async (dispatch) => {
  try {
    dispatch(deletblogRequest());
    const { data } = await axios.delete(
      `https://blogapp-lymy.onrender.com/api/v1/Blog/${id}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(deletblogSuccess(data.message));
  } catch (error) {
    console.log("deleteblog error ", error);
    dispatch(deleteblogFailure(error.response.data.message));
  }
};
