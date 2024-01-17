import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { getSingleBlog, updateBlog } from "../../actions/blog"

const EditBlogPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  // console.log(id)
  const dispatch = useDispatch()
  // const id = params.id

  useEffect(() => {
    dispatch(getSingleBlog(id))
  }, [dispatch, id])
  const { loading, singleBlog } = useSelector((state) => state.singleBlog)
  // console.log(singleBlog)
  const [title, setTitle] = useState("")
  const [description, setdescription] = useState("")
  useEffect(() => {
    // Check if singleBlog is not null before accessing its properties
    if (singleBlog) {
      setTitle(singleBlog.title || "")
      setdescription(singleBlog.description || "")
    }
  }, [singleBlog])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateBlog(title, description, id))
    navigate(`/blog/${id}`)
  }
  return (
    <div>
      {loading ? (
        <div>load</div>
      ) : (
        <form onSubmit={submitHandler}>
          {singleBlog && (
            <div>
              <textarea
                name="title"
                id="title"
                cols="30"
                rows="10"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>
              <textarea
                name="des"
                id="description"
                cols="60"
                rows="30"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              ></textarea>
              <button type="submit">submit</button>
            </div>
          )}
        </form>
      )}
    </div>
  )
}

export default EditBlogPage
