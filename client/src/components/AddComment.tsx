// src/components/AddComment.tsx
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../graphql/mutations";
import { GET_STORIES } from "../graphql/queries";

interface AddCommentProps {
  storyId: string;
}

const AddComment: React.FC<AddCommentProps> = ({ storyId }) => {
  const [content, setContent] = useState("");
  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_STORIES }],
  });

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      await addComment({
        variables: {
          storyId,
          content,
        },
      });
      setContent("");
      alert("Comment added successfully! 💬");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <form onSubmit={handleComment} className="add-comment-container">
      <textarea
        placeholder="Add your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Add Comment 💬</button>
      {error && <p>Error adding comment: {error.message}</p>}
    </form>
  );
};

export default AddComment;
