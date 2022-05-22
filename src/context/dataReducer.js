const DataReducer = (state, action) => {
  switch (action.type) {
    case "addBlog":
      console.log(action.payload);
      const addedData = [...state.data, action.payload];
      localStorage.setItem("data", JSON.stringify(addedData));
      return { ...state, data: addedData };
    case "editBlog":
      const d = state.data.map((c) =>
        action.payload.id == c.id ? { ...c, ...action.payload.data } : c
      );
      localStorage.setItem("data", JSON.stringify(d));
      return { ...state, data: d };
    case "addComment":
      console.log(action);
      const addcomment = state.data.map((c) =>
        action.payload.blogId == c.id
          ? { ...c, comments: [...c.comments, action.payload.data] }
          : c
      );
      console.log(addcomment);
      localStorage.setItem("data", JSON.stringify(addcomment));
      return { ...state, data: addcomment };

    case "deleteBlog":
      const dat = state.data.filter((c) => c.id != action.payload);
      localStorage.setItem("data", JSON.stringify(dat));
      return { ...state, data: dat };
    case "setProfile":
      localStorage.setItem("curr_profile", action.payload);
      return { ...state, current_profile: action.payload };
    default:
      return { ...state };
  }
};
export default DataReducer;
