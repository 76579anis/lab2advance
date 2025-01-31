import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ThreadsPage() {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedThreads = JSON.parse(localStorage.getItem("threads")) || [];
    setThreads(savedThreads);
  }, []);

  const addThread = () => {
    if (!newThread.trim()) return;
    const updatedThreads = [...threads, { id: Date.now(), text: newThread }];
    setThreads(updatedThreads);
    localStorage.setItem("threads", JSON.stringify(updatedThreads));
    setNewThread("");
  };

  const handleCommentsPage = () => {
    navigate("/comments"); // Navigate to comments page
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
                <button className="btn btn-danger" onClick={() => navigate("/")}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Threads Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center">Create a New Thread</h2>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Write a new thread..."
              value={newThread}
              onChange={(e) => setNewThread(e.target.value)}
            />
            <button className="btn btn-primary mt-2" onClick={addThread}>Post Thread</button>
          </div>

          <h3 className="text-center mt-5">All Threads</h3>
          <ul className="list-group">
            {threads.map((thread) => (
              <li key={thread.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{thread.text}</span>
                <button className="btn btn-info btn-sm" onClick={handleCommentsPage}>View Comments</button>
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
