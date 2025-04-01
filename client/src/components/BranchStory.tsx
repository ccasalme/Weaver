// src/components/BranchStory.tsx
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { BRANCH_STORY } from "../graphql/mutations";
import { GET_STORIES } from "../graphql/queries";

interface BranchStoryProps {
  parentStoryId: string;
  onClose: () => void;
}

const BranchStory: React.FC<BranchStoryProps> = ({ parentStoryId, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [branchStory, { error }] = useMutation(BRANCH_STORY, {
    refetchQueries: [{ query: GET_STORIES }],
  });

  const handleBranch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }

    try {
      await branchStory({
        variables: {
          storyId: parentStoryId,
          title,
          content,
        },
      });

      setTitle("");
      setContent("");
      alert("Branch created successfully! 🌱");
      onClose();
    } catch (err) {
      console.error("Error branching story:", err);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <form
          onSubmit={handleBranch}
          className="branch-story-modal"
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
            Branch a New Story 🌱
          </h2>
          <input
            type="text"
            placeholder="Branch Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="modal-input"
          />
          <textarea
            placeholder="What happens next? (max 3000 chars)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength={3000}
            className="modal-textarea"
          />
          <div className="modal-btn-group">
            <button type="submit" className="modal-submit-btn">
              Submit Branch ✨
            </button>
            <button
              type="button"
              onClick={onClose}
              className="modal-close-btn"
            >
              ❎ Cancel
            </button>
          </div>
          {error && <p className="modal-error">Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default BranchStory;
