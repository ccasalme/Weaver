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
        variables: { title, content },
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
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9998,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto",
        padding: "2rem",
      }}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(to right, rgb(159, 171, 174), rgb(59, 77, 77))",
          borderRadius: "12px",
          maxWidth: "700px",
          width: "100%",
          padding: "2rem",
          overflowY: "auto",
          maxHeight: "90vh",
          boxShadow: "0 0 20px rgba(0,0,0,0.4)",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h2
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
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />

          <textarea
            placeholder="Once upon a time in the multiverse... ✨"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength={3000}
            style={{
              minHeight: "150px",
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              resize: "vertical",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <button
              type="submit"
              style={{
                backgroundColor: "#3b4d4d",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Post Origin
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: "#ccc",
                padding: "0.75rem 1.5rem",
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
              }}
            >
              ❎ Cancel
            </button>
          </div>

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>
              Error: {error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateStory;
