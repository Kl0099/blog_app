import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { getSingleBlog, updateBlog } from "../../actions/blog"
import "react-quill/dist/quill.snow.css" // Import the styles
import ReactQuill, { Quill } from "react-quill"
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
]
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

              <ReactQuill
                value={description}
                modules={{
                  toolbar: toolbarOptions,
                }}
                style={{
                  width: "100%",
                  minHeight: "200px",
                  borderRadius: "20px",
                }}
                theme="snow"
                onChange={(value) => setdescription(value)}
              />

              {/* <textarea
                name="des"
                id="description"
                cols="60"
                rows="30"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              ></textarea> */}
              <button type="submit">submit</button>
            </div>
          )}
        </form>
      )}
    </div>
  )
}

export default EditBlogPage
