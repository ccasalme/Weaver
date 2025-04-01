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

    if (!title || !content) {
      alert("Please enter a title and content.");
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
    <div className="branch-story-modal">
      <h2>Branch a New Story 🌱</h2>
      <form onSubmit={handleBranch}>
        <input
          type="text"
          placeholder="Branch Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="What happens next?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Branch Story ✨</button>
      </form>
      {error && <p>Error branching story: {error.message}</p>}
    </div>
  );
};

export default BranchStory;
