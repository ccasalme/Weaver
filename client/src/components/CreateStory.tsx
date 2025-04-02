// src/components/CreateStory.tsx
import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_STORY } from "../graphql/mutations";
import { GET_STORIES } from "../graphql/queries";
import { motion, AnimatePresence } from "framer-motion";
// import ReactMarkdown from "react-markdown"; // optional

interface CreateStoryProps {
  onClose: () => void;
}

const CreateStory: React.FC<CreateStoryProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [createStory, { error, loading }] = useMutation(CREATE_STORY, {
    refetchQueries: [{ query: GET_STORIES }],
  });

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Please enter a title and story content.");
      return;
    }

    try {
      await createStory({
        variables: {
          title: title.trim(),
          content: content.trim(),
        },
      });
      alert("Story created successfully! 🎉");
      setTitle("");
      setContent("");
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
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <AnimatePresence>
        <motion.div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "12px",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
            Create a New Origin 📖
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              ref={titleRef}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: "100%",
                marginBottom: "1rem",
                padding: "0.5rem",
              }}
            />
            <textarea
              placeholder="Your origin story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              maxLength={3000}
              style={{
                width: "100%",
                height: "150px",
                padding: "0.5rem",
                marginBottom: "1rem",
              }}
            />

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#fff",
                  color: "#333",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Creating..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#ccc",
                  color: "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>

            {error && (
              <p style={{ color: "red", marginTop: "1rem" }}>
                Error: {error.message ?? "Something went wrong."}
              </p>
            )}
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CreateStory;
