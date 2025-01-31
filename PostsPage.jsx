import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  const addPost = () => {
    if (!newPost.trim()) return;
    const updatedPosts = [...posts, { id: Date.now(), title: newPost, likes: 0, dislikes: 0 }];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setNewPost("");
  };

  const handleLike = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].likes += 1;
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleDislike = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].dislikes += 1;
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleLogout = () => {
    navigate("/"); // Redirect back to login page
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Anisha</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Posts Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center">Create a New Post</h2>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Write a new post..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <button className="btn btn-primary mt-2" onClick={addPost}>Post</button>
          </div>

          <h3 className="text-center mt-5">All Posts</h3>
          <ul className="list-group">
            {posts.map((post, index) => (
              <li key={post.id} className="list-group-item d-flex justify-content-between align-items-center">
                <h5>{post.title}</h5>
                <div>
                  <button className="btn btn-success btn-sm me-2" onClick={() => handleLike(index)}>👍 {post.likes}</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDislike(index)}>👎 {post.dislikes}</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-center text-white py-3">
        <p>&copy; 2025 GURLEEN RAJPUT. All rights reserved.</p>
      </footer>
    </div>
  );
}

