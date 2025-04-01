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

    if (!title || !content) {
      alert("Please enter a title and content.");
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
          }}
        >
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
          >
            Create a New Story 📚
          </h2>

          <input
            type="text"
            placeholder="Story Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="modal-input"
          />

          <textarea
            placeholder="Once upon a time... (max 3000 chars)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength={3000}
            className="modal-textarea"
          />

          <div className="modal-btn-group">
            <button type="submit" className="modal-submit-btn">
              Post Story ✨
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
