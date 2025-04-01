// src/components/CreateStory.tsx
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_STORY } from "../graphql/mutations";
import { GET_STORIES } from "../graphql/queries";

interface CreateStoryProps {
  onClose: () => void;
}

const CreateStory: React.FC<CreateStoryProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createStory, { error }] = useMutation(CREATE_STORY, {
    refetchQueries: [{ query: GET_STORIES }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please enter a title and story content.");
      return;
    }

    try {
      await createStory({
        variables: {
          title,
          content,
        },
      });

      setTitle("");
      setContent("");
      alert("Story created successfully! 🎉");
      onClose();
    } catch (err) {
      console.error("Error creating story:", err);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <form
          onSubmit={handleSubmit}
          className="add-comment-container"
          style={{
            background: "linear-gradient(to right, rgb(159, 171, 174), rgb(59, 77, 77))",
            padding: "2rem",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          <h2
            className="modal-title"
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Create a New Origin 📚
          </h2>
          <input
            type="text"
            placeholder="Origin Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="modal-input"
          />
          <textarea
            placeholder="Once upon a time in the multiverse... ✨"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength={3000}
            className="modal-textarea"
          />
          <div className="modal-btn-group" style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button type="submit" className="modal-submit-btn">
              Post Origin
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

export default CreateStory;
