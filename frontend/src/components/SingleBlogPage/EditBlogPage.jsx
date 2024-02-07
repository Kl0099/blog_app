import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getSingleBlog, updateBlog } from "../../actions/blog";
import "react-quill/dist/quill.snow.css"; // Import the styles
import { Container, Button } from "@mui/material";
import Typography from "@mui/material/Typography";

import Loader from "../Loader/Loader";
import ReactQuill, { Quill } from "react-quill";
import { useAlert } from "react-alert";
import { editblogmessagenull, messagenull } from "../../reducers/blog";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  // [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  // [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  // [{ direction: "rtl" }], // text direction

  // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["link", "video"],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];
const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id)
  const dispatch = useDispatch();
  // const id = params.id

  const alert = useAlert();
  const [newloading, setNewLoading] = useState(false);

  useEffect(() => {
    dispatch(getSingleBlog(id));
  }, [dispatch, id]);
  const { loading, singleBlog } = useSelector((state) => state.singleBlog);
  // console.log(singleBlog)
  const { message, error } = useSelector((state) => state.editBlog);
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    // Check if singleBlog is not null before accessing its properties
    if (singleBlog) {
      setTitle(singleBlog.title || "");
      setdescription(singleBlog.description || "");
      setImage(singleBlog && singleBlog.image && singleBlog.image.url);
    }
  }, [singleBlog]);
  const handleimagechange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(updateBlog(title, description, id, image));
  };
  useEffect(() => {
    if (message) {
      setNewLoading(!newloading);
      console.log(message);
      alert.success(message);
      navigate(`/blog/${id}`);
      dispatch(editblogmessagenull());
    }
    if (error) {
      setNewLoading(!newloading);
      alert.error(error);
      navigate("/");
    }
  }, [message, error]);
  return loading || newloading === true ? (
    <Loader />
  ) : (
    <Container
      maxWidth="lg"
      sx={
        {
          // border: "1px solid black",
        }
      }
      className=" sm:min-h-fit w-full "
    >
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: "20px",
          flexDirection: "column",
          width: "100%",
          // border: "1px solid black",
        }}
        onSubmit={submitHandler}
        className=" overflow-x-scroll pl-2 flex-col"
      >
        {image === "" ? (
          <div className="min-h-[200px]"></div>
        ) : (
          <img
            src={image}
            alt="image"
            className=" min-h-[200px] object-contain"
          />
        )}

        <input
          accept="image/*"
          required
          type="file"
          name="file"
          id="file"
          onChange={handleimagechange}
          className=" sm:w-full border"
        />

        <input
          required
          // style={inputStyle}
          placeholder="Title...."
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className=" border-2 w-full p-2"
        />
        <ReactQuill
          modules={{
            toolbar: toolbarOptions,
          }}
          style={{
            flexWrap: "wrap",
            // border: "1px solid black",
          }}
          theme="snow" // You can customize the theme
          onChange={(value) => setdescription(value)}
          className="mb-8 w-[300px] sm:w-full"
          value={description}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={newloading}
            className=" outline-2 border-2 border-violet-200 "
          >
            Update
          </Button>
          <Button
            variant="primary"
            color="inherit"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default EditBlogPage;
