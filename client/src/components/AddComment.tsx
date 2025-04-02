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
  const titleRef = useRef<HTMLInputElement>(null);

  const [addComment, { error }] = useMutation(ADD_COMMENT, {
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
      <AnimatePresence>
        <motion.div
          className="modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <form
            onSubmit={handleComment}
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
              Add a Thread to the Origin 💬
            </h2>

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
              placeholder="Start weaving...start threading...🕷️🕸️ (max 3000 chars)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              maxLength={3000}
              className="modal-textarea"
            />

            <div className="markdown-preview">
              <h4 style={{ color: "white" }}>🔍 Preview</h4>
              <div style={{
                background: "white",
                borderRadius: "6px",
                padding: "1rem",
                maxHeight: "200px",
                overflowY: "auto",
              }}>
                <ReactMarkdown>{`**${title}**\n\n${content}`}</ReactMarkdown>
              </div>
            </div>

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
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AddComment;
