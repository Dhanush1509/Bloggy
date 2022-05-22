import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/Comments.module.css";
import Comment from "../components/Comment";
import { useLocation } from "react-router-dom";
import DataContext from "../context/dataContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Comments = () => {
  const { data, current_profile, addComment, profiles } =
    useContext(DataContext);
  const location = useLocation();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const handleClick = () => {
    if (comment === "")
      toast.error("Add comment", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    else {
      console.log("first")
      addComment(location.pathname.split("/")[2], {
        pDate: new Date(),
        comment,
        pId: current_profile,
        pAuthor: profiles[current_profile - 1].name,
      });
    }
  };

  useEffect(() => {
    setComments(
      data.filter((c) => c.id == location.pathname.split("/")[2])[0].comments
    );
    console.log(
      data.filter((c) => c.id == location.pathname.split("/")[2])[0].comments
    );
  }, [location,data,current_profile]);

  return (
    <div className={styles.Comments}>
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
      {comments.find((c) => c.pId === current_profile) ? (
        <></>
      ) : (
        <>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className={styles.button} onClick={handleClick}> Add Comment</button>
        </>
      )}

      <h3>Comments</h3>

      <div>
        {comments.map((c) => (
          <Comment key={c.id} d={c} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
