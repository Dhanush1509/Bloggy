import React,{useContext} from 'react'
import Appbar from '../components/Appbar';
import SingleBlog from '../components/SingleBlog';
import DataContext from '../context/dataContext';
import styles from "../styles/Home.module.css"
const Home = () => {
  const {data}=useContext(DataContext)
  return (
    <div className={styles.home}>
   {data.map(c=><SingleBlog key={c.id} title={c.title} desc={c.desc} id={c.id} img={c.img} author={c.author} pDate={c.pDate}/>)}
    </div>
  );
}

export default Home