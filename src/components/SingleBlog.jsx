import React from 'react'
import styles from '../styles/singleBlog.module.css'
import {Link} from "react-router-dom"
const SingleBlog = ({title,desc,id,pDate,author,img}) => {
  return (
    <div className={styles.singleBlogContainer}>
      <img src={img} alt={title} />
      <div>
        <h3>{title}</h3>
        <div>{`${desc.substr(0, 300)}...`}</div>
        
        {/* <div dangerouslySetInnerHTML={{ __html: desc }}></div>*/}
        <Link to={`/blog/${id}`}>
          <button>Read More</button>
        </Link>
      </div>
    </div>
  );
}

export default SingleBlog