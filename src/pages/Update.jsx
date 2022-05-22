import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "../styles/Update.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import DataContext from "../context/dataContext";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { BiImageAdd } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { htmlToText } from "html-to-text";
import htmlToFormattedText from "html-to-formatted-text";
const Update = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, current_profile,editBlog,deleteBlog } = useContext(DataContext);
  const search = location.search?.split("=")[1];
  const d = data.filter((c) => c.id == search)[0];
  const fileHandler = useRef(null);
  useEffect(() => {
    if (d.author_id !== current_profile) navigate("/");
  }, []);
console.log(d)
  const blocksFromHtml = htmlToDraft(d&&d.desc_html);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const [blog, setBlog] = useState({
    title: d.title,
    desc_html: EditorState.createWithContent(contentState),
    img: d.img,
    uDate: d.uDate,
    desc:""
  });
  const onEditorStateChange = (state) => {
    setBlog({ ...blog, desc_html: state });
  };
  const [loading,setLoading]=useState(false)
  const load = () => {
    setLoading(true);
    const timeout=setTimeout(()=>{setLoading(false);
       clearTimeout(timeout);
      navigate(`/blog/${d.id}`)
      },1000);
 
  };
  const handleClick = () => {
    fileHandler.current.click();
  };
const edit=()=>{
 
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
      editBlog({
        id: d.id,
        data: {
          ...blog,
          desc_html: draftToHtml(
            convertToRaw(blog.desc_html.getCurrentContent())
          ),
          desc:text
        },
      });
}
}
  const previewImg = (ev) => {
    console.log("first", fileHandler.current.files,ev);
    const file = fileHandler.current.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("image_preview").src = e.target.result;
      setBlog({ ...blog, img: e.target.result });
     
    };
      ev.target.value = "";
    reader.readAsDataURL(file);

  };
  const hide = () => {
    setBlog({ ...blog, img: ""});
  };

  return (
    <div className={styles.Update}>
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
      <div className={styles.icons_container}>
        {!blog.img && (
          <BiImageAdd
            size={36}
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          />
        )}
        <button onClick={edit}>{!loading ? "Update" : "Updating..."}</button>
        <button onClick={()=>{deleteBlog(d.id);navigate("/")}} style={{background:"red",borderColor:"red"}}>Delete</button>
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
        onChange={(e) => previewImg(e)}
      />

      <div
        className={styles.img_container}
        style={{ visibility: blog.img ? "visible" : "hidden" }}
      >
        <img
          id="image_preview"
          src={blog.img}
          className={styles.image}
          alt="img"
        />
        <ImCross className={styles.icon} size={50} onClick={hide} />
        <div className={styles.overlay}></div>
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
