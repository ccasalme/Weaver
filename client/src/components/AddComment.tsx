// src/components/AddComment.tsx
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { ADD_COMMENT } from "../graphql/mutations";
import { GET_STORIES } from "../graphql/queries";

interface AddCommentProps {
  storyId: string;
  onClose: () => void;
}

const AddComment: React.FC<AddCommentProps> = ({ storyId, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showSparkle, setShowSparkle] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  const [addComment, { error, loading }] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_STORIES }],
  });

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Title and thread content cannot be empty.");
      return;
    }

    try {
      await addComment({
        variables: {
          storyId: storyId ?? "",
          content: `**${title.trim()}**\n\n${content.trim()}`,
        },
      });
      setTitle("");
      setContent("");
      setShowSparkle(true);

      setTimeout(() => {
        setShowSparkle(false);
        onClose();
      }, 2000); // Enough time to let sparkle sparkle ✨
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <AnimatePresence>
        <motion.div
          className="modal center-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <form onSubmit={handleComment} className="add-comment-container">
            <h2 className="modal-title">💬 Add a Thread to the Origin</h2>

            <input
              ref={titleRef}
              type="text"
              placeholder="Thread Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="modal-input"
            />

            <textarea
              placeholder="Start weaving your thoughts...🕷️"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              maxLength={3000}
              className="modal-textarea"
            />

            <div className="markdown-preview" style={{ marginBottom: "1rem" }}>
              <h4 style={{ color: "white" }}>🔍 Preview</h4>
              <div className="preview-box">
                <ReactMarkdown>
                  {`**${title || "Untitled Thread"}**\n\n${content || "*No content yet...*"}`}
                </ReactMarkdown>
              </div>
            </div>

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
                {loading ? "Submitting..." : "Submit Thread"}
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
              <p className="modal-error" style={{ color: "#ffdddd", marginTop: "1rem" }}>
                Error: {error.message ?? "Something went wrong."}
              </p>
            )}
          </form>

          {showSparkle && (
            <div className="sparkle" role="alert">✨ Thread complete!</div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AddComment;
