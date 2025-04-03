import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE_STORY } from "../graphql/mutations";
import { GET_MY_PROFILE, GET_STORIES } from "../graphql/queries";
import { isLoggedIn } from "../utils/auth";

interface LikeButtonProps {
  storyId: string;
  initialLikes?: number;
  onShowOopsModal?: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  storyId,
  initialLikes = 0,
  onShowOopsModal,
}) => {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  // 🔐 Load user's liked stories from profile
  const { data: profileData, refetch: refetchProfile } = useQuery(GET_MY_PROFILE, {
    skip: !isLoggedIn(),
    fetchPolicy: "cache-and-network",
  });

  const [likeStory, { loading, error }] = useMutation(LIKE_STORY, {
    refetchQueries: [{ query: GET_STORIES }, { query: GET_MY_PROFILE }],
  });

  // ✅ Sync local liked state from profile data
  useEffect(() => {
    if (profileData?.myProfile?.likedStories) {
      const likedIds = profileData.myProfile.likedStories.map((s: { _id: string }) => s._id);
      setHasLiked(likedIds.includes(storyId));
    }
  }, [profileData, storyId]);

  const handleLike = async () => {
    if (!isLoggedIn()) {
      onShowOopsModal?.();
      return;
    }

    try {
      const { data } = await likeStory({ variables: { storyId } });
      const updatedLikes = data?.likeStory?.likes;

      if (typeof updatedLikes === "number") {
        setLikes(updatedLikes);
        setHasLiked((prev) => !prev);
        await refetchProfile(); // 🔄 keep user data in sync
      }
    } catch (err) {
      console.error("❌ Error toggling like:", err);
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
          backgroundColor: hasLiked ? "#ffc0cb" : "#ffcccb",
          color: "#333",
          border: "1px solid #ff9999",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
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
