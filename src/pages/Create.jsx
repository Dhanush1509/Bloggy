import React, { useContext, useState, useEffect, useRef } from "react";
import updateStyles from "../styles/Update.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import DataContext from "../context/dataContext";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { BiImageAdd } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { htmlToText } from "html-to-text";
import htmlToFormattedText from "html-to-formatted-text";
const Update = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, profiles, current_profile, addBlog } = useContext(DataContext);

  const fileHandler = useRef(null);
const uuid = uuidv4();
  const [blog, setBlog] = useState({
    title: "",
    desc_html: "",
    img: "",
    pDate: "",
    author: "",
    desc: "",
  });

  const add = () => {
    console.log("first");
    const html = blog.desc_html!==""
      ? draftToHtml(convertToRaw(blog.desc_html.getCurrentContent()))
      : "<p></p>";
    console.log(html);
    const text = blog.desc_html === "" ? "" : htmlToFormattedText(html);
    console.log(text);
    setBlog({ ...blog, desc: text});
    if (blog.title === "" || text === "")
      toast.error("Fields cannot be empty", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    else if (blog.img === "")
      toast.error("Upload an Image!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    else if (text.length < 300)
      toast.error(
        "Please add more content. content must be at least 320 characters",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    else {
      load();
      addBlog({
        id:uuid,
        author_id: current_profile,
        pDate: new Date(),
        author: profiles[current_profile - 1].name,
        img: blog.img,
        title: blog.title,
        desc: text,
        desc_html: html,
        uDate:new Date(),
        comments:[]
      });
      
    }
  };
  const onEditorStateChange = (state) => {
    setBlog({ ...blog, desc_html: state });
  };
  const [loading, setLoading] = useState(false);
  const load = () => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
      clearTimeout(timeout);

      navigate(`/blog/${uuid}`);
    }, 1000);
  };
  const handleClick = () => {
    fileHandler.current.click();
  };

  const previewImg = (ev) => {
    console.log("first", fileHandler.current.files);
    const file = fileHandler.current.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("image_preview").src = e.target.result;
      setBlog({ ...blog, img: e.target.result });
    };
    reader.readAsDataURL(file);
    ev.target.value = "";
  };
  const hide = () => {
    setBlog({ ...blog, img: "" });
  };

  return (
    <div className={updateStyles.Update}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={updateStyles.icons_container}>
        {!blog.img && (
          <BiImageAdd
            size={36}
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          />
        )}
        <button onClick={add}>{!loading ? "Create" : "Creating..."}</button>
      </div>
      <input
        type="text"
        placeholder="Title here....."
        value={blog.title}
        name="title"
        onChange={(e) => setBlog({ ...blog, [e.target.name]: e.target.value })}
      />
      <input
        ref={fileHandler}
        style={{ display: "none" }}
        type="file"
        name="img"
        onChange={previewImg}
      />

      <div
        className={updateStyles.img_container}
        style={{ visibility: blog.img ? "visible" : "hidden" }}
      >
        <img
          id="image_preview"
          src={blog.img}
          className={updateStyles.image}
          alt="img"
        />
        <ImCross className={updateStyles.icon} size={50} onClick={hide} />
        <div className={updateStyles.overlay}></div>
      </div>

      <Editor
        placeholder="Content here"
        editorState={blog.desc_html}
        toolbarClassName="toolbar"
        wrapperClassName="wrapper"
        editorClassName="editor"
        toolbar={{
          options: ["inline", "list", "textAlign", "history"],
          inline: { inDropdown: false },
          list: { inDropdown: false },
          textAlign: { inDropdown: false },
          link: { inDropdown: false },
          history: { inDropdown: false },
        }}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default Update;
