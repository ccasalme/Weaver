// src/components/LikeButton.tsx
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LIKE_STORY } from "../graphql/mutations";
import { GET_STORIES } from "../graphql/queries";

interface LikeButtonProps {
  storyId: string;
  initialLikes?: number;
  onShowOopsModal?: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ storyId, initialLikes = 0, onShowOopsModal }) => {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [likeCooldown, setLikeCooldown] = useState<boolean>(false);
  const [likeStory, { loading, error }] = useMutation(LIKE_STORY, {
    refetchQueries: [{ query: GET_STORIES }],
  });

  useEffect(() => {
    const likedKey = `liked_${storyId}`;
    const lastLikedTime = localStorage.getItem(`${likedKey}_timestamp`);
    const likedStatus = localStorage.getItem(likedKey);

    if (likedStatus === "true") setHasLiked(true);

    if (lastLikedTime) {
      const timeElapsed = Date.now() - parseInt(lastLikedTime, 10);
      if (timeElapsed < 15 * 60 * 1000) {
        setLikeCooldown(true);
        const remaining = 15 * 60 * 1000 - timeElapsed;
        const timeout = setTimeout(() => setLikeCooldown(false), remaining);
        return () => clearTimeout(timeout);
      }
    }
  }, [storyId]);

  const handleLike = async () => {
    const token = localStorage.getItem("id_token");
    if (!token) {
      onShowOopsModal?.();
      return;
    }

    if (likeCooldown) {
      alert("You must wait 15 minutes before liking this again.");
      return;
    }

    try {
      const { data } = await likeStory({ variables: { storyId } });
      const updatedLikes = data?.likeStory?.likes;

      if (typeof updatedLikes === "number") {
        setLikes(updatedLikes);
        const likedKey = `liked_${storyId}`;

        if (hasLiked) {
          // Unliking
          localStorage.removeItem(likedKey);
          localStorage.removeItem(`${likedKey}_timestamp`);
          setHasLiked(false);
        } else {
          // Liking
          localStorage.setItem(likedKey, "true");
          localStorage.setItem(`${likedKey}_timestamp`, Date.now().toString());
          setHasLiked(true);
          setLikeCooldown(true);

          // Set timer to clear cooldown
          setTimeout(() => setLikeCooldown(false), 15 * 60 * 1000);
        }
      }
    } catch (err) {
      console.error("Error liking/unliking story:", err);
    }
  };

  return (
    <>
      <button
        className="like-btn"
        onClick={handleLike}
        disabled={loading || likeCooldown}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: hasLiked ? "#ffc0cb" : "#ffcccb",
          color: "#333",
          border: "1px solid #ff9999",
          borderRadius: "4px",
          cursor: loading || likeCooldown ? "not-allowed" : "pointer",
          fontWeight: "bold",
        }}
      >
        ❤️ {loading ? "Processing..." : hasLiked ? `Unlike (${likes})` : `Like (${likes})`}
      </button>

      {error && (
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "0.85rem",
            color: "red",
          }}
        >
          ⚠️ Couldn’t process your request. Try again later.
        </p>
      )}
    </>
  );
};

export default LikeButton;
