import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Blog.module.css";
import { useLocation,Link } from "react-router-dom";
import moment from "moment";
import { CgProfile, CgCalendar } from "react-icons/cg";
import Comments from "../pages/Comments";
import DataContext from "../context/dataContext";
const Blog = () => {
  const {data,current_profile}=useContext(DataContext)
  const location = useLocation();
  console.log(location.pathname.split("/")[2]);
  const [blog, setBlog] = useState({});
  useEffect(() => {
    const d = data.filter(
      (c) => c.id == location.pathname.split("/")[2]
    )[0];
    window.document.title = d.title;
    setBlog(d);
  }, [location,current_profile]);
 
  return (
    <div className={styles.blog}>
      <div className={styles.container}>
        <h1>{blog.title}</h1>

        <div className={styles.about}>
          <div>
            <CgCalendar size={20} />
            <span></span>
            {moment(blog.pDate).format("DD-MM-YYYY")}
          </div>
          <div>
            <CgProfile size={20} />
            <span></span>
            {`Published by ${blog.author}`}
          </div>
        </div>
        {current_profile == blog.author_id && (
          <Link to={`/update?id=${blog.id}`}>
            <button>Edit</button>
          </Link>
        )}
        <img src={blog.img} alt={blog.title} />
        <div dangerouslySetInnerHTML={{ __html: blog.desc_html }} />
      </div>
      <Comments />
    </div>
  );
};

export default Blog;
