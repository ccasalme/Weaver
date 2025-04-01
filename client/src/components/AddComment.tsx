import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../graphql/mutations";
import { GET_STORIES } from "../graphql/queries";

interface AddCommentProps {
  storyId: string;
  onClose: () => void; // ✅ Now expects an onClose handler
}

const AddComment: React.FC<AddCommentProps> = ({ storyId, onClose }) => {
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
      onClose(); // ✅ Close the modal after successful comment
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleComment} className="add-comment-container">
          <h2>Add a Thread to the Origin 💬</h2>
          <textarea
            placeholder="Add your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength={3000}
          />
          <button type="submit">Submit Thread</button>
          <button type="button" onClick={onClose} className="close-btn">
            ❎ Close
          </button>
          {error && <p>Error adding comment: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddComment;
