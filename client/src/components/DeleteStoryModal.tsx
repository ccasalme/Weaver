import React, { useState } from "react";
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
  const [confirmStage, setConfirmStage] = useState<1 | 2 | 3>(1);
  const [showCollapse, setShowCollapse] = useState(false);


  const [deleteStory, { loading, error }] = useMutation(DELETE_STORY, {
    update(cache, { data }) {
      if (!data?.deleteStory) return;

      // Get existing data from cache
      const existingStories = cache.readQuery<{
        getStories: { _id: string }[];
      }>({
        query: GET_STORIES,
        variables: { limit: 6, offset: 0 },
      });

      if (existingStories?.getStories) {
        const updatedStories = existingStories.getStories.filter(
          (story: { _id: string }) => story._id !== storyId
        );

        cache.writeQuery({
          query: GET_STORIES,
          variables: { limit: 6, offset: 0 },
          data: { getStories: updatedStories },
        });
      }
    },
  });

  const handleFinalDelete = async () => {
    setShowCollapse(true);
    setConfirmStage(3);
    setTimeout(async () => {
      try {
        await deleteStory({ variables: { storyId } });
        onDeleted();
      } catch (err) {
        console.error("Failed to delete story:", err);
      }
    }, 3000);
  };

  return (
    <>
      <div
        className="modal-backdrop"
        onClick={onClose}
        style={{
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
          backgroundImage: `radial-gradient(circle at center, rgba(255, 0, 0, 0.25), transparent 70%),
            repeating-linear-gradient(0deg, transparent, transparent 49%, rgba(255, 0, 0, 0.25) 50%, transparent 51%)`,
          backgroundSize: "100% 100%, 4px 100%",
          backdropFilter: "blur(2px)",
          animation: showCollapse ? "fadeOut 0.5s ease-out forwards" : "none",
          transition: "background-color 0.5s ease-out",
        }}
      >
        <div
          className="modal"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "linear-gradient(to right, rgb(159, 171, 174), rgb(59, 77, 77))",
            padding: "2rem",
            borderRadius: "12px",
            width: "90%",
            maxWidth: "600px",
            textAlign: "center",
            color: "white",
            boxShadow: "0 0 25px rgba(255, 0, 0, 0.5)",
          }}
        >
          <h2
            style={{
              fontSize: "1.9rem",
              fontWeight: "bold",
              background: "rgba(43, 37, 37, 0.25)",
              border: "1px solid #ff0000",
              textShadow: "0 0 5px #ff0000",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              display: "inline-block",
              marginBottom: "1rem",
              color: "#fff"
            }}
          >
            ⚠️ DELETE ORIGIN UNIVERSE
          </h2>

          {confirmStage === 1 && (
            <>
              <p style={{ 
                marginBottom: "1rem", 
                fontSize: "1.9rem", 
                textAlign: "center",
                color: "#fff",
                textShadow: "0 0 5px #ff0000",
                lineHeight: "1.5",
                whiteSpace: "pre-line",
                fontWeight: "bold",
                background: "rgba(33, 26, 26, 0.25)",
                }}>
                You're about to permanently erase a universe from the weave. All
                branches and threads will vanish. 
                This is the point of no return...
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                <button
                  onClick={() => setConfirmStage(2)}
                  disabled={loading}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ccc",
                    color: "#333",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    boxShadow: "0 0 50px rgba(246, 32, 32, 0.4)",
                    transition: "background-color 0.3s ease"
                  }}
                >
                  {loading ? "Processing..." : "Yes, delete universe"}
                </button>
                <button
                  onClick={onClose}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ccc",
                    color: "#333",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    boxShadow: "0 0 50px rgba(246, 32, 32, 0.4)",
                    transition: "background-color 0.3s ease"
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {confirmStage === 2 && (
            <>
              <p
              style={{ 
                marginBottom: "1rem", 
                fontSize: "1.9rem", 
                textAlign: "center",
                color: "#fff",
                textShadow: "0 0 5px #ff0000",
                lineHeight: "1.5",
                whiteSpace: "pre-line",
                fontWeight: "bold",
                background: "rgba(33, 26, 26, 0.25)",
                }}
              >
                {`Dearest Weaver, this is the \nFINAL WARNING \nfrom us, the Architects. \n \nYou are\nabout to destroy a whole\ntimeline. There is no going\nback.\n\nPoint of no return.\n\nYou will now be a\nDestroyer of Worlds...and\nyou may receive the wrath of\nother Weavers that helped\nyour universe grow.\n\nARE YOU ABSOLUTELY SURE?`}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  marginTop: "1.5rem",
                }}
              >
                <button
                  onClick={handleFinalDelete}
                  disabled={loading}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ccc",
                    color: "#333",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    boxShadow: "0 0 50px rgba(246, 32, 32, 0.4)",
                    transition: "background-color 0.3s ease"
                  }}
                >
                  {loading ? "Deleting..." : "🔥 Yes, destroy it"}
                </button>
                <button
                  onClick={onClose}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ccc",
                    color: "#333",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    boxShadow: "0 0 50px rgba(246, 32, 32, 0.4)",
                    transition: "background-color 0.3s ease"
                  }}
                >
                  ❎ Cancel
                </button>
              </div>
            </>
          )}

          {confirmStage === 3 && (
            <p
            style={{ 
              marginBottom: "1rem", 
              fontSize: "1.9rem", 
              textAlign: "center",
              color: "#fff",
              textShadow: "0 0 5px #ff0000",
              lineHeight: "1.5",
              whiteSpace: "pre-line",
              fontWeight: "bold",
              background: "rgba(33, 26, 26, 0.25)",
              }}
            >
              Good job. You just deleted a whole universe. 🌌<br />
              A timeline that consisted of worlds... gone. The multiverse is shaken.<br />
              Branched timelines are damaged. This origin is now wiped from the database.<br /><br />
              May you bear the weight of the consequences of destroying an origin universe.<br />
              Do not be surprised if other Weavers form a Council to overthrow you. 😔
            </p>
          )}

          {error && (
            <p style={{ marginTop: "1rem", color: "#ffdddd" }}>
              Error: {error.message}
            </p>
          )}
        </div>
      </div>

      {/* 🔥 Visual Drama Effect */}
      {showCollapse && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            background: "radial-gradient(circle at center, rgba(255,0,0,0.2), transparent 60%)",
            backdropFilter: "blur(1px)",
            animation: "rippleCrack 3s ease-out forwards",
            zIndex: 9998,
          }}
        />
      )}

      <style>
        {`
          @keyframes rippleCrack {
            0% {
              opacity: 0.3;
              transform: scale(1);
              filter: brightness(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.3);
              filter: brightness(1.4);
            }
            100% {
              opacity: 0;
              transform: scale(2);
              filter: brightness(0.8);
            }
          }
        `}
      </style>
    </>
  );
};

export default DeleteStoryModal;
