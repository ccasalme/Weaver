import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../graphql/mutations";

interface AddCommentProps {
  storyId: string;
  onClose: () => void;
}

const AddComment: React.FC<AddCommentProps> = ({ storyId, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showRipple, setShowRipple] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);

  const [addComment, { error, loading }] = useMutation(ADD_COMMENT, {
    update(cache, { data }) {
      if (!data?.addComment) return;

      cache.modify({
        fields: {
          getStories(existingStories = []) {
            return existingStories.map((storyRef: { __ref?: string; comments?: { __ref: string }[] }) => {
              if (storyRef.__ref?.includes(storyId)) {
                return {
                  ...storyRef,
                  comments: [...(storyRef.comments || []), { __ref: `Comment:${data.addComment._id}` }],
                };
              }
              return storyRef;
            });
          },
        },
      });
    },
  });

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = `${title.trim()} ${content.trim()}`;

    if (!title.trim() || !content.trim()) {
      alert("Thread title and content cannot be empty.");
      return;
    }

    if (trimmed.length > 280) {
      alert("Thread too long! Please keep it under 280 characters total.");
      return;
    }

    setShowRipple(true);

    setTimeout(async () => {
      try {
        await addComment({
          variables: {
            storyId,
            content: `**${title.trim()}**\n\n${content.trim()}`,
          },
        });

        setTitle("");
        setContent("");
        setCommentSuccess(true);
        setShowRipple(false);

        setTimeout(() => {
          setCommentSuccess(false);
          onClose();
        }, 2000);
      } catch (err) {
        console.error("Error adding comment:", err);
        setShowRipple(false);
      }
    }, 2000);
  };

  return (
    <>
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
          backgroundImage: `radial-gradient(circle at center, rgba(18, 194, 213, 0.25), transparent 70%),
          repeating-linear-gradient(0deg, transparent, transparent 49%, rgba(0, 191, 255, 0.25) 50%, transparent 51%)`,
          backgroundSize: "100% 100%, 4px 100%",
        }}
      >
        <div
          className="modal"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "linear-gradient(to right, rgb(159, 171, 174), rgb(59, 77, 77))",
            padding: "2rem",
            borderRadius: "12px",
            width: "90%",
            maxWidth: "600px",
            textAlign: "center",
            color: "white",
            boxShadow: "0 0 25px rgba(0, 255, 255, 0.4)",
          }}
        >
          <h2
              style={{ 
                color: "#fff",
                marginBottom: "1rem", 
                padding: "0.5rem", 
                width: "100%",
                boxShadow: "0 0 10px rgba(0, 255, 255, 0.4)",
                borderRadius: "6px",
                border: "none",
               }}
          >
            🧵 Add a Thread to the Origin
          </h2>

          <form onSubmit={handleComment}>
            <input
              type="text"
              placeholder="Thread Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ 
                marginBottom: "1rem", 
                padding: "0.5rem", 
                width: "100%",
                boxShadow: "0 0 10px rgba(0, 255, 255, 0.4)",
                borderRadius: "6px",
                border: "none",
               }}
            />
            <textarea
              placeholder="Weave your story... (Max 280 chars)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={280}
              required
              style={{ 
                marginBottom: "1rem", 
                padding: "0.5rem", 
                width: "100%", 
                height: "120px", 
                fontSize: "1.5rem",
                boxShadow: "0 0 10px rgba(0, 255, 255, 0.4)",
                borderRadius: "6px",
                border: "none",
               }}
            />
            <p style={{ color: "#ccc", marginBottom: "1rem" }}>
              {`${(title + content).length} / 280 characters`}
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  marginBottom: "1rem",
                  backgroundColor: "#444",
                  color: "#333",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  boxShadow: "0 0 10px rgba(0, 255, 255, 0.4)",
                  transition: "background-color 0.3s ease"
                }}
              >
                {loading ? "Submitting..." : "Submit Thread"}
              </button>
              <button
                type="button"
                onClick={onClose}
                style={{
                  marginBottom: "1rem",
                  backgroundColor: "#444",
                  color: "#333",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  boxShadow: "0 0 10px rgba(0, 255, 255, 0.4)",
                  transition: "background-color 0.3s ease"
                }}
              >
                ❎ Cancel
              </button>
            </div>
          </form>

          {commentSuccess && (
            <p style={{ color: "#aff", marginTop: "1rem", fontSize: "1.1rem" }}>
              ✨ Thread woven successfully into the universe!
            </p>
          )}

          {error && (
            <p style={{ color: "#ffdddd", marginTop: "1rem" }}>
              Error: {error.message ?? "Something went wrong."}
            </p>
          )}
        </div>
      </div>

      {/* Ripple/Glitch Effect */}
      {showRipple && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            background: "radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 60%)",
            backdropFilter: "blur(1px)",
            animation: "rippleGlitch 2.5s ease-out forwards",
            zIndex: 9998,
          }}
        />
      )}

      <style>
        {`
          @keyframes rippleGlitch {
            0% { opacity: 0.3; transform: scale(1); filter: brightness(1); }
            50% { opacity: 1; transform: scale(1.2) rotate(1deg); filter: contrast(1.5) brightness(1.2); }
            100% { opacity: 0; transform: scale(2); filter: brightness(0.8); }
          }
        `}
      </style>
    </>
  );
};

export default AddComment;
