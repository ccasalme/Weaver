// src/components/LikeButton.tsx
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LIKE_STORY } from "../graphql/mutations";
import { GET_STORIES } from "../graphql/queries";

interface LikeButtonProps {
  storyId: string;
  initialLikes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ storyId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [likeStory, { loading }] = useMutation(LIKE_STORY, {
    refetchQueries: [{ query: GET_STORIES }],
  });

  const handleLike = async () => {
    try {
      const { data } = await likeStory({ variables: { storyId } });

      if (data?.likeStory) {
        setLikes(data.likeStory.likes);
      }
    } catch (err) {
      console.error("Error liking story:", err);
    }
  };

  return (
    <button className="like-btn" onClick={handleLike} disabled={loading}>
      ❤️ {loading ? "Liking..." : `Like ${likes}`}
    </button>
  );
};

export default LikeButton;
