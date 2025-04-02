// src/components/DeleteStoryModal.tsx
import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_STORY } from "../graphql/mutations";
import { GET_STORIES } from "../graphql/queries";

interface DeleteStoryModalProps {
  storyId: string;
  onClose: () => void;
}

const DeleteStoryModal: React.FC<DeleteStoryModalProps> = ({ storyId, onClose }) => {
  const [deleteStory, { loading, error }] = useMutation(DELETE_STORY, {
    refetchQueries: [{ query: GET_STORIES }],
  });

  const handleDelete = async () => {
    const confirm1 = window.confirm(
      "Woah, there, Weaver. You're about to delete an entire universe. By doing so, every thread in this universe will be deleted. You will be deleting a whole timeline. Are you sure that you want this?"
    );
    if (!confirm1) return;

    const confirm2 = window.confirm(
      "This is the last warning from the Architects, our Dearest Weaver, once you delete this universe, there is absolutely no going back...Are you absolutely sure? This is the point of no return..."
    );
    if (!confirm2) return;

    try {
      await deleteStory({ variables: { storyId } });
      onClose();
    } catch (err) {
      console.error("Error deleting story:", err);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ color: "white", textAlign: "center" }}>
          Confirm Deletion
        </h2>
        <p style={{ color: "white", textAlign: "center" }}>
          You're about to permanently erase an Origin Story.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <button
            onClick={handleDelete}
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff4444",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {loading ? "Deleting..." : "Yes, Delete It 🗑️"}
          </button>
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              backgroundColor: "#999",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error.message}</p>}
      </div>
    </div>
  );
};

export default DeleteStoryModal;
