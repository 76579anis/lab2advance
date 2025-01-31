import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [showCopyright, setShowCopyright] = useState(false);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    setComments(savedComments);
  }, []);

  const handleLogout = () => {
    navigate("/"); // Redirect back to login page
  };

  const handleThreads = () => {
    navigate("/threads"); // Navigate to threads page
  };

  const handlePosts = () => {
    navigate("/posts"); // Navigate to posts page
  };

  const handleCommentsPage = () => {
    navigate("/comments"); // Navigate to comments page
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    const updatedComments = [...comments, { id: Date.now(), text: newComment, likes: 0, dislikes: 0 }];
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    setNewComment("");
  };

  const handleLike = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].likes += 1;
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const handleDislike = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].dislikes += 1;
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
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
                <a className="nav-link" href="#hero">Hero Section</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#three-column">Three-Column Section</a>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="d-flex align-items-center justify-content-center text-center"
        style={{ backgroundImage: "url('public/hero_image.jpg')", backgroundSize: "cover", backgroundPosition: "center", height: "100vh", color: "white" }}>
        <div>
          <h1>Welcome to My Hero Section</h1>
          <p>This is a brief description of the hero section.</p>
        </div>
      </section>

      {/* Three-Column Section */}
      <section id="three-column" className="py-5">
        <div className="container">
          <div className="row">
            {/* Column 1 - Threads */}
            <div className="col-md-4 text-center">
              <img src="box3_image.jpg" alt="Column 1" className="img-fluid mb-3" />
              <h3>Threads</h3>
              <p>Short description for threads.</p>
              <button className="btn btn-primary" onClick={handleThreads}>View Threads</button>
            </div>
            {/* Column 2 - Posts */}
            <div className="col-md-4 text-center">
              <img src="box7_image.jpg" alt="Column 2" className="img-fluid mb-3" />
              <h3>Posts</h3>
              <p>Short description for posts.</p>
              <button className="btn btn-success" onClick={handlePosts}>View Posts</button>
            </div>
            {/* Column 3 - Comments */}
            <div className="col-md-4 text-center">
              <img src="box8_image.jpg" alt="Column 3" className="img-fluid mb-3" />
              <h3>Comments</h3>
              <p>Short description for comments.</p>
              <button className="btn btn-info" onClick={handleCommentsPage}>View Comments</button>
            </div>
          </div>
        </div>
      </section>

      {/* Comment Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center">ThreadPost Comments</h2>
          
          {/* Comment Input */}
          <div className="mb-3">
            <textarea 
              className="form-control" 
              rows="3" 
              placeholder="Write a comment..." 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="btn btn-primary mt-2" onClick={addComment}>Post Comment</button>
          </div>

          {/* Display Comments */}
          <ul className="list-group">
            {comments.map((comment, index) => (
              <li key={comment.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{comment.text}</span>
                <div>
                  <button className="btn btn-success btn-sm me-2" onClick={() => handleLike(index)}>👍 {comment.likes}</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDislike(index)}>👎 {comment.dislikes}</button>
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

      {/* Copyright Popup */}
      {showCopyright && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setShowCopyright(false)}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Copyright Information</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCopyright(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>&copy; 2025 Anishaa. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


