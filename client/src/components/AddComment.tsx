// src/components/AddComment.tsx
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../graphql/mutations";
import { GET_STORIES } from "../graphql/queries";

interface AddCommentProps {
  storyId: string;
  onClose: () => void;
}

const AddComment: React.FC<AddCommentProps> = ({ storyId, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_STORIES }],
  });

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Title and comment content cannot be empty.");
      return;
    }

    try {
      await addComment({
        variables: {
          storyId,
          content: `**${title}**\n\n${content}`,
        },
      });
      setTitle("");
      setContent("");
      alert("Thread added successfully! 💬");
      onClose();
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleComment} className="add-comment-container"
          style={{
            background: "linear-gradient(to right,rgb(159, 171, 174),rgb(59, 77, 77))",
            padding: "2rem",
            borderRadius: "8px",}}>
          <h2 
          className="modal-title"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            color: "white",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
          >Add a Thread to the Origin 💬</h2>
          <input
            type="text"
            placeholder="Thread Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="modal-input"
          />
          <textarea
            placeholder="Start weaving...start threading...🕷️🕸️ (max 3000 chars)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength={3000}
            className="modal-textarea"
          />
          <div className="modal-btn-group">
            <button type="submit" className="modal-submit-btn">
              Submit Thread
            </button>
            <button type="button" onClick={onClose} className="modal-close-btn">
              ❎ Cancel
            </button>
          </div>
          {error && <p className="modal-error">Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddComment;
