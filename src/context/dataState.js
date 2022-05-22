import { useReducer } from "react";
import DataContext from "./dataContext";
import DataReducer from "./dataReducer";
import { v4 as uuidv4 } from "uuid";
import d from "../assets/data.json";
const DataState = ({ children }) => {
  if (!localStorage.data) localStorage.setItem("data", JSON.stringify(d));
  const [state, dispatch] = useReducer(DataReducer, {
    data: localStorage.data ? JSON.parse(localStorage.data) : d,
    profile_data: [
      { name: "Dhanush", id: 1 },
      { name: "Venus", id: 2 },
      { name: "Hansi", id: 3 },
      { name: "Vansh", id: 4 },
      { name: "Rahul", id: 5 },
      { name: "Mohith", id: 6 },
    ],
    current_profile: localStorage.curr_profile
      ? localStorage.getItem("curr_profile")
      : 1,
  });
  const addBlog = (data) => {
    const id = uuidv4();
    dispatch({ type: "addBlog", payload: { ...data, id } });
  };
  const editBlog = (d) => {
    console.log(d);
    dispatch({ type: "editBlog", payload: d });
  };
  const deleteBlog = (id) => {
    dispatch({ type: "deleteBlog", payload: id });
  };
  const addComment = (blogId, data) => {
    console.log(blogId);
    const id = uuidv4();
    dispatch({
      type: "addComment",
      payload: { data: { id, ...data }, blogId },
    });
  };
  const setProfile=(id)=>{
    console.log(id)
    dispatch({ type: "setProfile", payload:id})
  }
  return (
    <DataContext.Provider
      value={{
        profiles: state.profile_data,
        data: state.data,
        addBlog,
        editBlog,
        addComment,
        deleteBlog,
        setProfile,
        current_profile: state.current_profile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataState;
