import React from 'react'
import moment from 'moment'
import styles from "../styles/Comment.module.css";
const Comment = ({d}) => {
  console.log(d)
  return (
    <div className={styles.Comment}>
    <p>{d.comment}</p>
    <p>{`Published by ${d.pAuthor} on ${moment(d.pDate).format('DD-MM-YYYY')}`}</p>
    </div>
  )
}

export default Comment