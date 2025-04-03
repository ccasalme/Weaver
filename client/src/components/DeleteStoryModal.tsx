import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_STORY } from "../graphql/mutations";
import { GET_STORIES, GET_MY_PROFILE } from "../graphql/queries";

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
  const [confirmedOnce, setConfirmedOnce] = useState(false);

  const [deleteStory, { loading, error }] = useMutation(DELETE_STORY, {
    refetchQueries: [{ query: GET_STORIES }, { query: GET_MY_PROFILE }],
  });

  const handleFinalDelete = async () => {
    try {
      await deleteStory({ variables: { storyId } });

      alert(
        "🌌 The multiverse has been altered.\n\nThe origin universe is now deleted.\nMay you carry the guilt as a Weaver who unraveled fate itself."
      );

      onDeleted();
    } catch (err) {
      console.error("Failed to delete story:", err);
    }
  };

  const renderFirstWarning = () => (
    <>
      <h2
        className="modal-title"
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#fff",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        ⚠️ DELETE ORIGIN UNIVERSE
      </h2>
      <p style={{ color: "#ffdddd", textAlign: "center", marginBottom: "1.5rem", fontSize: "1.1rem" }}>
        You’re about to permanently erase a universe from the weave. All branches and threads will vanish.<br /><br />
        This is the point of no return...
      </p>
    </>
  );

  const renderSecondWarning = () => (
    <p style={{ color: "#ffdddd", textAlign: "center", fontSize: "1.1rem" }}>
      <strong>Dearest Weaver</strong>, you are about to destroy a whole timeline.<br />
      There is no going back.<br />
      <br />
      <strong>Point of no return.</strong><br />
      <br />
      You will now be a destroyer of worlds... and may receive the wrath of other Weavers that helped your universe grow.<br />
      <br />
      <strong>Are you absolutely sure?</strong>
    </p>
  );

  return (
    <div className="modal-backdrop" onClick={onClose} style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{
        background: "linear-gradient(to right, rgb(159, 171, 174), rgb(59, 77, 77))",
        padding: "2rem",
        borderRadius: "12px",
        maxWidth: "600px",
        width: "90%",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
      }}>
        {!confirmedOnce ? renderFirstWarning() : renderSecondWarning()}

        <div className="modal-btn-group" style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "1.5rem",
          flexWrap: "wrap",
        }}>
          {!confirmedOnce ? (
            <button
              onClick={() => setConfirmedOnce(true)}
              disabled={loading}
              style={{
                backgroundColor: "#ff4444",
                color: "#fff",
                padding: "0.6rem 1.2rem",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Yes, delete this origin 🌌
            </button>
          ) : (
            <button
              onClick={handleFinalDelete}
              disabled={loading}
              style={{
                backgroundColor: "#8b0000",
                color: "#fff",
                padding: "0.6rem 1.2rem",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              I understand. Delete it. 🕸️
            </button>
          )}

          <button
            onClick={onClose}
            style={{
              backgroundColor: "#444",
              color: "#fff",
              padding: "0.6rem 1.2rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ❎ Cancel
          </button>
        </div>

        {error && (
          <p style={{ color: "#ffdddd", marginTop: "1rem", textAlign: "center" }}>
            Error: {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default DeleteStoryModal;
