import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


export default function CommentsPage() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    setComments(savedComments);
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center">All Comments</h2>
      <ul className="list-group">
        {comments.length === 0 ? (
          <li className="list-group-item">No comments available.</li>
        ) : (
          comments.map((comment) => (
            <li key={comment.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{comment.text}</span>
              <div>
                <button className="btn btn-success btn-sm me-2">👍 {comment.likes}</button>
                <button className="btn btn-danger btn-sm">👎 {comment.dislikes}</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
