import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { BRANCH_STORY } from "../graphql/mutations";
import { GET_STORIES } from "../graphql/queries";
import { isLoggedIn } from "../utils/auth";

interface BranchStoryProps {
  parentStoryId: string;
  onClose: () => void;
}

const BranchStory: React.FC<BranchStoryProps> = ({ parentStoryId, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authValid, setAuthValid] = useState(true); // 👀 track login

  const [branchStory, { error, loading }] = useMutation(BRANCH_STORY, {
    refetchQueries: [{ query: GET_STORIES }],
  });

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await isLoggedIn();
      if (!valid) {
        alert("You must be logged in to branch a story. ✋");
        setAuthValid(false);
        onClose();
      }
    };
    checkAuth();
  }, [onClose]);

  const handleBranch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }

    try {
      await branchStory({
        variables: {
          storyId: parentStoryId ?? "",
          title: title.trim(),
          content: content.trim(),
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

  if (!authValid) return null;

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
            style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
          />

          <textarea
            placeholder="What happens next? (max 3000 chars)"
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
              {loading ? "Submitting..." : "Submit Branch ✨"}
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

export default BranchStory;
