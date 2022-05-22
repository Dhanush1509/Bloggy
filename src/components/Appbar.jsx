import React from "react";
import styles from "../styles/Appbar.module.css";
import { Link,useLocation } from "react-router-dom";

const Appbar = () => {
   
  const links = [
    {
        id:1,
      name: "Blogs",
      path: "/",
    },
    {
            id:2,
      name: "Create",
      path: "/create",
    }
  ];
  return (
    <div className={styles.appbar}>
      <ul>
    {links.map(c=><CustomLinks name={c.name} key={c.id} path={c.path} />)}
      </ul>
    </div>
  );
};
const CustomLinks=({name,path})=>{
     const location = useLocation();
    return (
      <li className={location.pathname === path ? styles.active : undefined}>
        <Link to={path}>{name}</Link>
      </li>
    );
}
export default Appbar;
