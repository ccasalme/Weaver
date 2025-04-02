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
  // const [showPreview, setShowPreview] = useState(false); // optional preview toggle

  const [createStory, { error }] = useMutation(CREATE_STORY, {
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
      await createStory({ variables: { title, content } });
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
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Create a New Origin 📖</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              ref={titleRef}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
            />
            <textarea
              placeholder="Your origin story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              style={{
                width: "100%",
                height: "150px",
                padding: "0.5rem",
                marginBottom: "1rem",
              }}
            />
            {/* Markdown preview toggle */}
            {/* <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              style={{ marginBottom: "1rem" }}
            >
              {showPreview ? "Hide" : "Show"} Preview
            </button>

            {showPreview && (
              <div
                style={{
                  background: "#f4f4f4",
                  padding: "1rem",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              >
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            )} */}

            <div style={{ display: "flex", gap: "1rem" }}>
              <button type="submit">Submit</button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
            {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CreateStory;
