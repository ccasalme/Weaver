// src/pages/Homepage.tsx
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import "./Wireframe.css"; // CSS file
import Login from "../components/Login";
import JoinUs from "../components/JoinUs";
import OOPSModal from "../components/OOPSModal";
import AddComment from "../components/AddComment";
import BranchStory from "../components/BranchStory";
import HeroBanner from "../assets/weaverBanner.png";
import SecondBanner from "../assets/weaverBanner2.png";
import { GET_STORIES } from "../graphql/queries";
import { LIKE_STORY } from "../graphql/mutations";

// ✅ Define Story Interface
interface Story {
  _id: string;
  title: string;
  content: string;
  author: {
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showJoinUs, setShowJoinUs] = useState<boolean>(false);
  const [showOopsModal, setShowOopsModal] = useState<boolean>(false);
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [branchStoryId, setBranchStoryId] = useState<string | null>(null);

  // ✅ Check login status on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // ✅ Fetch stories from GraphQL
  const { loading, error, data, refetch } = useQuery<{ getStories: Story[] }>(
    GET_STORIES
  );

  // ✅ Like story mutation
  const [likeStory] = useMutation(LIKE_STORY, {
    onCompleted: () => refetch(),
  });

  // ✅ Handle Like Click
  const handleLikeClick = async (storyId: string) => {
    try {
      await likeStory({ variables: { storyId } });
      console.log("Story liked!");
    } catch (error) {
      console.error("Error liking story:", error);
    }
  };

  // ✅ Open Add Comment Modal
  const openAddCommentModal = (storyId: string) => {
    if (!isAuthenticated) {
      setShowOopsModal(true); // ❗️ Show OOPS modal if not logged in
      return;
    }
    setActiveStoryId(storyId); // Open AddComment modal for that story
  };

  // ✅ Open Branch Story Modal
  const openBranchModal = (storyId: string) => {
    if (!isAuthenticated) {
      setShowOopsModal(true);
      return;
    }
    setBranchStoryId(storyId); // Open BranchStory modal
  };

  // ✅ Loading and Error States
  if (loading) return <p>Loading stories... 📚</p>;
  if (error) return <p>Error loading stories: {error.message}</p>;

  return (
    <div className="page-container">
      {/* ✅ Hero Banner Section */}
      <div className="banner-container">
        <img src={HeroBanner} alt="Weaver Banner" className="hero-banner" />
        <img
          src={SecondBanner}
          alt="Weaver Banner 2"
          className="hero-banner-2"
        />
      </div>

      {/* ✅ Show login and join us buttons only if NOT logged in */}
      {!isAuthenticated && (
        <div className="auth-container">
          <h2
            style={{
              color: "white",
              textAlign: "center",
              background:
                "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Welcome to Weaver!
          </h2>
          <p style={{ color: "white", textAlign: "center" }}>
            Join us to explore, create, and engage with stories.
          </p>

          {/* ✅ Login Button */}
          <button onClick={() => setShowLogin(true)} className="login-btn">
            Login
          </button>

          {/* ✅ Join Us Button */}
          <button onClick={() => setShowJoinUs(true)} className="join-btn">
            Join Us
          </button>
        </div>
      )}

      {/* ✅ Stories Section */}
      <div className="story-feed">
        <h2
          style={{
            color: "white",
            textAlign: "center",
            background:
              "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Recent Stories 📚
        </h2>
        {Array.isArray(data?.getStories) && data.getStories.length > 0 ? (
          data.getStories.map((story) => (
            <div key={story._id} className="story-card">
              <h3>{story.title}</h3>
              <p>{story.content}</p>
              <p>
                <strong>By:</strong> {story.author.username}
              </p>

              {/* ❤️ Like Button */}
              <button
                onClick={() => handleLikeClick(story._id)}
                className="like-btn"
              >
                ❤️ Vote ({story.likes || 0})
              </button>

              {/* 🌱 Branch Button */}
              <button
                onClick={() => openBranchModal(story._id)}
                className="branch-btn"
              >
                🌱 Branch
              </button>

              {/* 💬 Add Comment Button */}
              <button
                onClick={() => openAddCommentModal(story._id)}
                className="comment-btn"
              >
                💬 Add a thread to the origin!
              </button>

              {/* 🎉 Comments Section */}
              <div className="comments-section">
                {story.comments && story.comments.length > 0 ? (
                  story.comments.map((comment) => (
                    <div key={comment._id} className="comment-card">
                      <p>
                        <strong>{comment.author.username}:</strong>{" "}
                        {comment.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No threads to the origin yet. Be the first to thread! 💬</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No Origin Multiverses available. Start by creating one! 📚</p>
        )}
      </div>

      {/* ✅ Render modals for Login and JoinUs */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          switchToJoinUs={() => {
            setShowLogin(false);
            setShowJoinUs(true);
          }}
        />
      )}

      {showJoinUs && (
        <JoinUs
          onClose={() => setShowJoinUs(false)}
          switchToLogin={() => {
            setShowJoinUs(false);
            setShowLogin(true);
          }}
        />
      )}

      {/* ❗️ Render OOPS Modal if not authenticated */}
      {showOopsModal && (
        <OOPSModal
          onClose={() => setShowOopsModal(false)}
          switchToLogin={() => {
            setShowOopsModal(false);
            setShowLogin(true);
          }}
          switchToJoinUs={() => {
            setShowOopsModal(false);
            setShowJoinUs(true);
          }}
        />
      )}

      {/* 💬 Add Comment Modal */}
      {activeStoryId && (
        <AddComment
          storyId={activeStoryId}
          onClose={() => setActiveStoryId(null)}
        />
      )}

      {/* 🌱 Branch Story Modal */}
      {branchStoryId && (
        <BranchStory
          parentStoryId={branchStoryId}
          onClose={() => setBranchStoryId(null)}
        />
      )}
    </div>
  );
};

export default Homepage;
