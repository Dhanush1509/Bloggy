
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Appbar from "./components/Appbar";
import Header from "./components/Header";
import Blog from "./components/Blog";

import DataState from "./context/dataState";
import Create from "./pages/Create";
import User from "./components/User";
function App() {
  return (
    <DataState>
      <Router>

        <Header style={{ background: "#d9d9d9" }} />
        <Appbar />
        <User/>
        <Routes>
          <Route path="/create" element={<Create />} />
          <Route path="/update" element={<Update />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </DataState>
  );
}

export default App;
