// src/pages/Homepage.tsx
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import "./Wireframe.css"; // CSS file
import Login from "../components/Login";
import JoinUs from "../components/JoinUs";
import HeroBanner from "../assets/weaverBanner.png";
import SecondBanner from "../assets/weaverBanner2.png";
import { GET_STORIES } from "../graphql/queries";
import { LIKE_STORY, BRANCH_STORY, ADD_COMMENT } from "../graphql/mutations";

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
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>(
    {}
  );

  // ✅ Login check on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token found:", !!token);
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

  // ✅ Branch story mutation
  const [branchStory] = useMutation(BRANCH_STORY, {
    onCompleted: () => refetch(),
  });

  // ✅ Add comment mutation
  const [addComment] = useMutation(ADD_COMMENT, {
    onCompleted: () => refetch(),
  });

  // ✅ Handle Like
  const handleLikeClick = async (storyId: string) => {
    try {
      await likeStory({ variables: { storyId } });
      console.log("Story liked!");
    } catch (error) {
      console.error("Error liking story:", error);
    }
  };

  // ✅ Handle Branch
  const handleBranchClick = async (storyId: string) => {
    const title = prompt("Enter the title for your branched story:");
    const content = prompt("Enter the content for your branched story:");
    if (title && content) {
      try {
        await branchStory({ variables: { storyId, title, content } });
        console.log("Story branched!");
      } catch (error) {
        console.error("Error branching story:", error);
      }
    }
  };

  // ✅ Handle Comment Input Change
  const handleCommentChange = (storyId: string, content: string) => {
    if (content.length <= 3000) {
      setCommentInputs({
        ...commentInputs,
        [storyId]: content,
      });
    } else {
      alert("Comments cannot exceed 3000 characters! 😳");
    }
  };

  // ✅ Handle Add Comment
  const handleAddComment = async (storyId: string) => {
    const content = commentInputs[storyId];
    if (content && content.trim() !== "") {
      try {
        await addComment({ variables: { storyId, content } });
        console.log("Comment added!");
        setCommentInputs({
          ...commentInputs,
          [storyId]: "", // Clear input after submitting
        });
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    } else {
      alert("Comment cannot be empty! 📝");
    }
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
          <button
            onClick={() => setShowLogin(true)}
            className="login-btn"
            style={{
              background:
                "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          {/* ✅ Join Us Button */}
          <button
            onClick={() => setShowJoinUs(true)}
            className="join-btn"
            style={{
              background:
                "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
            }}
          >
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
                ❤️ Like ({story.likes || 0})
              </button>

              {/* 🌱 Branch Button */}
              <button
                onClick={() => handleBranchClick(story._id)}
                className="branch-btn"
              >
                🌱 Branch
              </button>

              {/* 💬 Comment Input + Button */}
              <div className="comment-input-section">
                <textarea
                  value={commentInputs[story._id] || ""}
                  onChange={(e) =>
                    handleCommentChange(story._id, e.target.value)
                  }
                  placeholder="Add your comment... (max 3000 chars)"
                  className="comment-input"
                  rows={3}
                  maxLength={3000}
                />
                <button
                  onClick={() => handleAddComment(story._id)}
                  className="comment-btn"
                >
                  💬 Submit Comment
                </button>
              </div>

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
                  <p>No comments yet. Be the first to comment! 💬</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No stories available. Start by creating one! 📚</p>
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
    </div>
  );
};

export default Homepage;
