// src/components/CreateStory.tsx
import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_STORY } from "../graphql/mutations";
import { GET_MY_PROFILE, GET_STORIES } from "../graphql/queries";
import { isLoggedIn } from "../utils/auth";
import confetti from "canvas-confetti";

interface CreateStoryProps {
  onClose: () => void;
  onCreated?: () => void;
}

const CreateStory: React.FC<CreateStoryProps> = ({ onClose, onCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authValid, setAuthValid] = useState(true);

  const titleRef = useRef<HTMLInputElement>(null);

  const [createStory, { error, loading }] = useMutation(CREATE_STORY, {
    refetchQueries: [{ query: GET_STORIES }, { query: GET_MY_PROFILE }],
  });

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await isLoggedIn();
      if (!valid) {
        alert("You must be logged in to create a story. ✋");
        setAuthValid(false);
        onClose();
      }
    };
    checkAuth();
    titleRef.current?.focus();
  }, [onClose]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }

    try {
      await createStory({
        variables: {
          title: title.trim(),
          content: content.trim(),
        },
      });

      setTitle("");
      setContent("");
      triggerConfetti();
      alert("Origin created successfully! 📖✨");
      onCreated?.();
      onClose();
    } catch (err) {
      console.error("Error creating story:", err);
    }
  };

  if (!authValid) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <form
          onSubmit={handleSubmit}
          className="create-story-modal"
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
            Create a New Origin 📖
          </h2>

          <input
            type="text"
            placeholder="Origin Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={titleRef}
            required
            className="modal-input"
            style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
          />

          <textarea
            placeholder="What's your origin? (max 3000 chars)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength={3000}
            className="modal-textarea"
            style={{
              marginBottom: "1rem",
              padding: "0.5rem",
              width: "100%",
              height: "120px",
            }}
          />

          <div className="modal-btn-group" style={{ display: "flex", gap: "1rem" }}>
            <button
              type="submit"
              className="modal-submit-btn"
              disabled={loading}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#fff",
                color: "#333",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {loading ? "Creating..." : "Submit ✨"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="modal-close-btn"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#ccc",
                color: "#000",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ❎ Cancel
            </button>
          </div>

          {error && (
            <p
              className="modal-error"
              style={{
                color: "#ffdddd",
                background: "#330000",
                padding: "0.5rem",
                marginTop: "1rem",
                borderRadius: "4px",
              }}
            >
              Error: {error.message ?? "Something went wrong."}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateStory;
