import React, { useContext,useState } from 'react'
import DataContext from '../context/dataContext'

const User = () => {
    const {setProfile,profiles}=useContext(DataContext)
    const [name,setName]=useState("Dhanush")
  return (
    <div style={{padding:"0 5vw",margin:"20px 0",display:"flex",justifyContent:"flex-end",gap:"20px"}}>
    <label>Select User</label>
    <select  value={name} style={{padding:"3px 5px",cursor:"pointer"}} onChange={e=>{setName(e.target.value);setProfile(Number(e.target.childNodes[e.target.selectedIndex].getAttribute("id")));}}>
    {profiles.map(c=><option key={c.id} id={c.id} value={c.name}>{c.name}</option>)}
    </select>
    </div>
  )
}

export default User