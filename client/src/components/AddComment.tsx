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
            return existingStories.map(
              (storyRef: {
                __ref?: string;
                comments?: { __ref: string }[];
              }) => {
                if (storyRef.__ref?.includes(storyId)) {
                  return {
                    ...storyRef,
                    comments: [
                      ...(storyRef.comments || []),
                      { __ref: `Comment:${data.addComment._id}` },
                    ],
                  };
                }
                return storyRef;
              }
            );
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
        console.log("AddComment: mutation resolved");

        setTitle("");
        setContent("");
        setCommentSuccess(true);
        setShowRipple(false);

        setTimeout(() => {
          console.log("AddComment: calling onClose()");
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
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>🧵 Add a Thread to the Origin</h2>

          <form onSubmit={handleComment}>
            <input
              type="text"
              placeholder="Thread Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Weave your story... (Max 280 chars)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={280}
              required
            />
            <p>{`${(title + content).length} / 280 characters`}</p>

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Thread"}
            </button>
            <button type="button" onClick={onClose}>
              ❎ Cancel
            </button>
          </form>

          {commentSuccess && (
            <p>✨ Thread woven successfully into the universe!</p>
          )}
          {error && <p>Error: {error.message ?? "Something went wrong."}</p>}
        </div>
      </div>

      {showRipple && <div className="ripple-overlay" />}
    </>
  );
};

export default AddComment;
