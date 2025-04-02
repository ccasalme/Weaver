// src/components/DeleteStoryModal.tsx
import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_STORY } from "../graphql/mutations";
import { GET_STORIES } from "../graphql/queries";

interface DeleteStoryModalProps {
  storyId: string;
  onClose: () => void;
  onDeleted: () => void;
}

const DeleteStoryModal: React.FC<DeleteStoryModalProps> = ({
  storyId,
  onClose,
  onDeleted,
}) => {
  const [deleteStory, { loading, error }] = useMutation(DELETE_STORY, {
    refetchQueries: [{ query: GET_STORIES }],
  });

  const handleFinalDelete = async () => {
    try {
      await deleteStory({ variables: { storyId } });

      alert(
        "Good job. You just deleted a whole universe. 🌌\n\nA timeline that consisted of worlds... gone. The multiverse is shaken. Branched timelines are damaged. This origin is now wiped from the database.\n\nMay you bear the weight of the consequences of destroying an origin universe.\n\nDo not be surprised if other Weavers like yourself form a Council to overthrow you. 😔"
      );

      onDeleted();
    } catch (err) {
      console.error("Failed to delete story:", err);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ color: "white" }}>
          ⚠️ Final Warning from the Architects
        </h2>
        <p style={{ color: "white", marginTop: "1rem" }}>
          Woah, there, Weaver. You're about to delete an entire universe. Every
          thread in this universe will be lost. This is the point of no return...
        </p>
        <p style={{ color: "#ffdddd", marginTop: "1rem" }}>
          Are you absolutely sure you want to proceed?
        </p>

        <div className="modal-btn-group" style={{ marginTop: "1.5rem" }}>
          <button
            onClick={handleFinalDelete}
            disabled={loading}
            className="delete-confirm-btn"
            style={{
              backgroundColor: "darkred",
              color: "white",
              padding: "0.5rem 1rem",
              marginRight: "1rem",
              border: "none",
              borderRadius: "4px",
            }}
          >
            {loading ? "Deleting..." : "Yes, delete this universe"}
          </button>
          <button
            onClick={onClose}
            className="cancel-btn"
            style={{
              backgroundColor: "#444",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Cancel
          </button>
        </div>

        {error && (
          <p style={{ color: "#ffdddd", marginTop: "1rem" }}>
            Error: {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default DeleteStoryModal;
