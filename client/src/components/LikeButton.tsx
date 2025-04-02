// src/components/LikeButton.tsx
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LIKE_STORY } from "../graphql/mutations";
import { GET_STORIES } from "../graphql/queries";

interface LikeButtonProps {
  storyId: string;
  initialLikes?: number; // made optional in case of fallback
}

const LikeButton: React.FC<LikeButtonProps> = ({ storyId, initialLikes = 0 }) => {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [likeStory, { loading, error }] = useMutation(LIKE_STORY, {
    refetchQueries: [{ query: GET_STORIES }],
  });

  const handleLike = async () => {
    if (!storyId) return console.warn("Missing story ID for like mutation.");

    try {
      const { data } = await likeStory({ variables: { storyId } });

      const updatedLikes = data?.likeStory?.likes;
      if (typeof updatedLikes === "number") {
        setLikes(updatedLikes);
      }
    } catch (err) {
      console.error("Error liking story:", err);
    }
  };

  return (
    <>
      <button
        className="like-btn"
        onClick={handleLike}
        disabled={loading}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#ffcccb",
          color: "#333",
          border: "1px solid #ff9999",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold",
        }}
      >
        ❤️ {loading ? "Liking..." : `Like ${likes}`}
      </button>

      {error && (
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "0.85rem",
            color: "red",
          }}
        >
          ⚠️ Couldn’t like story. Try again later.
        </p>
      )}
    </>
  );
};

export default LikeButton;
