import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import App from "./App";
import ThreadsPage from "./ThreadsPage"; 
import CommentsPage from "./CommentsPage";
import PostsPage from "./PostsPage";  // Import the new PostsPage component

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<App />} />
      <Route path="/threads" element={<ThreadsPage />} />
      <Route path="/comments" element={<CommentsPage />} />
      <Route path="/Posts" element={<PostsPage />} /> {/* Add the new route for posts */}
    </Routes>
  </Router>,
  document.getElementById("root")
);
