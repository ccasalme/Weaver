// src/pages/Homepage.tsx
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import "./Wireframe.css";
import Login from "../components/Login";
import JoinUs from "../components/JoinUs";
import OOPSModal from "../components/OOPSModal";
import AddComment from "../components/AddComment";
import BranchStory from "../components/BranchStory";
import CreateStory from "../components/CreateStory";
import DeleteStoryModal from "../components/DeleteStoryModal"; // ✅ New import
import HeroBanner from "../assets/weaverBanner.png";
import SecondBanner from "../assets/weaverBanner2.png";
import { GET_STORIES } from "../graphql/queries";
import { CREATE_STORY, LIKE_STORY } from "../graphql/mutations";

interface Story {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  likes: number;
  comments: Comment[];
}

interface Comment {
  _id: string;
  content: string;
  author: {
    username: string;
  };
}

const Homepage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showJoinUs, setShowJoinUs] = useState(false);
  const [showOopsModal, setShowOopsModal] = useState(false);
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [branchStoryId, setBranchStoryId] = useState<string | null>(null);
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const { loading, error, data, refetch } = useQuery<{ getStories: Story[] }>(GET_STORIES);

  const [createStory] = useMutation(CREATE_STORY, {
    onCompleted: () => {
      setNewTitle("");
      setNewContent("");
      refetch();
    },
  });

  const [likeStory] = useMutation(LIKE_STORY, {
    onCompleted: () => refetch(),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    setIsAuthenticated(!!token);
    setCurrentUserId(userId);
  }, []);

  const handleLikeClick = async (storyId: string) => {
    if (!isAuthenticated) {
      setShowOopsModal(true);
      return;
    }
    try {
      await likeStory({ variables: { storyId } });
    } catch (error) {
      console.error("Error liking story:", error);
    }
  };

  const openAddCommentModal = (storyId: string) => {
    if (!isAuthenticated) {
      setShowOopsModal(true);
      return;
    }
    setActiveStoryId(storyId);
  };

  const openBranchModal = (storyId: string) => {
    if (!isAuthenticated) {
      setShowOopsModal(true);
      return;
    }
    setBranchStoryId(storyId);
  };

  const openDeleteModal = (storyId: string) => {
    setStoryToDelete(storyId);
    setShowDeleteModal(true);
  };

  const handleQuickCreateStory = async () => {
    if (!isAuthenticated) {
      setShowOopsModal(true);
      return;
    }
    if (!newTitle.trim() || !newContent.trim()) return;
    try {
      await createStory({ variables: { title: newTitle, content: newContent } });
    } catch (err) {
      console.error("Error creating story:", err);
    }
  };

  if (loading) return <p>Loading stories... 📚</p>;
  if (error) return <p>Error loading stories: {error.message}</p>;

  return (
    <div className="page-container">
      <div className="banner-container">
        <img src={HeroBanner} alt="Weaver Banner" className="hero-banner" />
        <img src={SecondBanner} alt="Weaver Banner 2" className="hero-banner-2" />
      </div>

      {!isAuthenticated && (
        <div className="auth-container">
          <h2 style={{
            color: "white",
            textAlign: "center",
            background: "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
            padding: "10px", borderRadius: "5px"
          }}>
            Welcome to Weaver!
          </h2>
          <p style={{ color: "white", textAlign: "center" }}>
            Join us to explore, create, and engage with stories.
          </p>
          <button onClick={() => setShowLogin(true)} className="login-btn">Login</button>
          <button onClick={() => setShowJoinUs(true)} className="join-btn">Join Us</button>
        </div>
      )}

      <div className="quick-create-story" style={{ textAlign: "center", marginTop: "30px" }}>
        <h3 style={{ color: "white" }}>Quick Origin Submission</h3>
        <input
          type="text"
          placeholder="Story Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ padding: "8px", width: "60%", borderRadius: "8px", marginBottom: "8px" }}
        />
        <br />
        <textarea
          placeholder="What's your origin story?"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows={4}
          style={{ padding: "10px", width: "60%", borderRadius: "8px" }}
        />
        <br />
        <button onClick={handleQuickCreateStory} className="create-btn" style={{ marginTop: "10px" }}>
          🚀 Submit Origin
        </button>
      </div>

      <div className="story-feed">
        <h2 style={{
          color: "white",
          textAlign: "center",
          background: "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
          padding: "10px", borderRadius: "5px"
        }}>
          Recent Stories 📚
        </h2>

        {data?.getStories?.length ? data.getStories.map((story) => (
          <div key={story._id} className="story-card">
            <h3>{story.title}</h3>
            <p>{story.content}</p>
            <p><strong>By:</strong> {story.author.username}</p>
            <div className="action-btn-group">
              <button onClick={() => handleLikeClick(story._id)} className="like-btn">
                ❤️ Vote ({story.likes || 0})
              </button>
              <button onClick={() => openBranchModal(story._id)} className="branch-btn">
                🌱 Branch
              </button>
              <button onClick={() => openAddCommentModal(story._id)} className="comment-btn">
                💬 Add a thread to the origin!
              </button>
              {isAuthenticated && currentUserId === story.author._id && (
                <button onClick={() => openDeleteModal(story._id)} className="delete-btn">
                  🗑️ Delete Origin
                </button>
              )}
            </div>
            <div className="comments-section">
              {story.comments?.length ? (
                story.comments.map((comment) => (
                  <div key={comment._id} className="comment-card">
                    <p><strong>{comment.author.username}:</strong> {comment.content}</p>
                  </div>
                ))
              ) : (
                <p style={{ color: "white" }}>No threads yet. Be the first to thread! 💬</p>
              )}
            </div>
          </div>
        )) : (
          <p style={{
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            background: "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
            fontSize: "2.5em",
            fontWeight: "bold",
            lineHeight: "1.5em",
            letterSpacing: "0.05em",
            textTransform: "uppercase"
          }}>
            No Origin Multiverses available. Start by creating one! 📚
          </p>
        )}
      </div>

      {/* ✅ Modals */}
      {showLogin && (
        <Login onClose={() => setShowLogin(false)} switchToJoinUs={() => {
          setShowLogin(false); setShowJoinUs(true);
        }} />
      )}
      {showJoinUs && (
        <JoinUs onClose={() => setShowJoinUs(false)} switchToLogin={() => {
          setShowJoinUs(false); setShowLogin(true);
        }} />
      )}
      {showOopsModal && (
        <OOPSModal
          onClose={() => setShowOopsModal(false)}
          switchToLogin={() => {
            setShowOopsModal(false); setShowLogin(true);
          }}
          switchToJoinUs={() => {
            setShowOopsModal(false); setShowJoinUs(true);
          }}
        />
      )}
      {activeStoryId && (
        <AddComment storyId={activeStoryId} onClose={() => setActiveStoryId(null)} />
      )}
      {branchStoryId && (
        <BranchStory parentStoryId={branchStoryId} onClose={() => setBranchStoryId(null)} />
      )}
      {showCreateStory && (
        <div className="modal-backdrop" onClick={() => setShowCreateStory(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <CreateStory onClose={() => setShowCreateStory(false)} />
          </div>
        </div>
      )}
      {showDeleteModal && storyToDelete && (
        <DeleteStoryModal
          storyId={storyToDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setStoryToDelete(null);
          }}
          onDeleted={() => {
            setShowDeleteModal(false);
            setStoryToDelete(null);
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default Homepage;
