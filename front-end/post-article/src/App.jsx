import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllPosts from "./pages/AllPosts";
import AddNew from "./pages/AddNew";
import Preview from "./pages/Preview";
import EditArticle from "./pages/EditArticle";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<AllPosts />} />
            <Route path="/add-new" element={<AddNew />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/article/:id" element={<EditArticle />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
