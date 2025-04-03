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
  const [showRipple, setShowRipple] = useState(false);
  const [storySuccess, setStorySuccess] = useState(false);
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
      alert("Origin title and content cannot be empty.");
      return;
    }

    setShowRipple(true);

    setTimeout(async () => {
      try {
        await createStory({
          variables: {
            title: title.trim(),
            content: content.trim(),
          },
        });

        setTitle("");
        setContent("");
        setStorySuccess(true);
        setShowRipple(false);
        triggerConfetti();

        setTimeout(() => {
          setStorySuccess(false);
          onCreated?.();
          onClose();
        }, 2000);
      } catch (err) {
        console.error("Error creating story:", err);
        setShowRipple(false);
      }
    }, 2000);
  };

  if (!authValid) return null;

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
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              background: "rgba(0, 0, 0, 0.25)",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
            }}
          >
            📖 Weave a New Origin
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Origin Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              ref={titleRef}
              required
              style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
            />
            <textarea
              placeholder="Start weaving your origin... (Max 280 chars)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={280}
              required
              style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%", height: "120px" }}
            />
            <p style={{ color: "#ccc", marginBottom: "1rem" }}>
              {`${(title + content).length} / 280 characters`}
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#fff",
                  color: "#333",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {loading ? "Creating..." : "Submit Origin ✨"}
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
                ❎ Cancel
              </button>
            </div>
          </form>

          {storySuccess && (
            <p style={{ color: "#aff", marginTop: "1rem", fontSize: "1.1rem" }}>
              ✨ Origin successfully added to the multiverse!
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

export default CreateStory;
