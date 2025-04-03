// src/pages/Homepage.tsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import "./Wireframe.css";
import Login from "../components/Login";
import JoinUs from "../components/JoinUs";
import OOPSModal from "../components/OOPSModal";
import AddComment from "../components/AddComment";
import BranchStory from "../components/BranchStory";
import CreateStory from "../components/CreateStory";
import DeleteStoryModal from "../components/DeleteStoryModal";
import HeroBanner from "../assets/weaverBanner.png";
import SecondBanner from "../assets/weaverBanner2.png";
import { GET_STORIES, GET_ME, GET_MY_PROFILE } from "../graphql/queries";
import { LIKE_STORY, FOLLOW_USER } from "../graphql/mutations";

interface Story {
  _id: string;
  title: string;
  content: string;
  likes: number;
  author: { _id: string; username: string };
  comments: {
    _id: string;
    content: string;
    author: { _id: string; username: string };
  }[];
  branches?: Story[];
  parentStory?: Story | null;
}

const Homepage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showJoinUs, setShowJoinUs] = useState(false);
  const [showOopsModal, setShowOopsModal] = useState(false);
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [branchStoryId, setBranchStoryId] = useState<string | null>(null);
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState<string | null>(null);
  const [stories, setStories] = useState<Story[]>([]);

  const storyContainerRef = useRef<HTMLDivElement>(null);

  const { data: meData } = useQuery(GET_ME);
  const { data: profileData } = useQuery(GET_MY_PROFILE);
  const isUserLoggedIn = !!meData?.me;
  const currentUserId = meData?.me?._id || null;
  const followingIds = profileData?.myProfile?.following?.map((f: { _id: string }) => f._id) || [];

  const { data, fetchMore, refetch } = useQuery(GET_STORIES, {
    variables: { offset: 0, limit: 6 },
    fetchPolicy: "network-only",
  });

  const [likeStory] = useMutation(LIKE_STORY, {
    onCompleted: () => refetch(),
  });

  const [followUser] = useMutation(FOLLOW_USER, {
    update(cache, { data }) {
      const existing = cache.readQuery<{ myProfile: { following: { _id: string }[] } }>({
        query: GET_MY_PROFILE,
      });

      if (existing && data?.followUser) {
        const alreadyFollowing = existing.myProfile.following.some(
          (f) => f._id === data.followUser._id
        );

        if (!alreadyFollowing) {
          cache.writeQuery({
            query: GET_MY_PROFILE,
            data: {
              myProfile: {
                ...existing.myProfile,
                following: [...existing.myProfile.following, data.followUser],
              },
            },
          });
        }
      }
    },
  });

  useEffect(() => {
    if (data?.getStories) {
      setStories((prev) => {
        const seen = new Set<string>();
        const merged = [...data.getStories, ...prev].filter((s) => {
          if (seen.has(s._id)) return false;
          seen.add(s._id);
          return true;
        });
        return merged;
      });
    }
  }, [data]);

  const handleScroll = useCallback(() => {
    if (!storyContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = storyContainerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      fetchMore({
        variables: { offset: stories.length, limit: 6 },
      })
        .then((res) => {
          const newStories = res.data.getStories;
          setStories((prev) => {
            const seen = new Set<string>();
            const merged = [...prev, ...newStories].filter((s) => {
              if (seen.has(s._id)) return false;
              seen.add(s._id);
              return true;
            });
            return merged;
          });
        })
        .catch((err) => console.error("Scroll Fetch Error:", err));
    }
  }, [fetchMore, stories]);

  const handleLikeClick = async (storyId: string) => {
    if (!isUserLoggedIn) return setShowOopsModal(true);
    try {
      await likeStory({ variables: { storyId } });
    } catch (err) {
      console.error("Error liking:", err);
    }
  };

  const handleFollowClick = async (userId: string) => {
    if (!isUserLoggedIn) return setShowOopsModal(true);
    try {
      await followUser({ variables: { targetUserId: userId } });
    } catch (err) {
      console.error("Follow failed:", err);
    }
  };

  const handleThread = (id: string) => {
    if (!isUserLoggedIn) return setShowOopsModal(true);
    setActiveStoryId(id);
  };

  const handleBranch = (id: string) => {
    if (!isUserLoggedIn) return setShowOopsModal(true);
    setBranchStoryId(id);
  };

  const handleDelete = (id: string) => {
    if (!isUserLoggedIn) return setShowOopsModal(true);
    setStoryToDelete(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="page-container" ref={storyContainerRef} onScroll={handleScroll}>
      <div className="banner-container">
        <img src={HeroBanner} alt="Weaver Banner" className="hero-banner" />
        <img src={SecondBanner} alt="Weaver Banner 2" className="hero-banner-2" />
      </div>

      {!isUserLoggedIn && (
        <div className="auth-container">
          <h2 className="auth-title">Welcome to Weaver!</h2>
          <p className="auth-text">Join us to explore, create, and engage with stories.</p>
          <button onClick={() => setShowLogin(true)} className="login-btn">Login</button>
          <button onClick={() => setShowJoinUs(true)} className="join-btn">Join Us</button>
        </div>
      )}

      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <button
          onClick={() => {
            if (!isUserLoggedIn) return setShowOopsModal(true);
            setShowCreateStory(true);
          }}
          style={{
            background: "#fff",
            padding: "3.5rem 2.5rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            backgroundColor: "#ccc",
            color: "#333",
            fontSize: "1.5rem",
            boxShadow: "0 0 10px rgba(0, 255, 255, 0.4)",
            transition: "background-color 0.3s ease"
          }}
        >
          + Create a New Origin
        </button>
      </div>

      <div className="story-feed">
        <h2 className="story-feed-title"
          style={{
            color: "white",
            background: "linear-gradient(to right, #3e5151,rgb(150, 137, 113))",
            padding: "1rem 2rem",
            borderRadius: "12px",
            textAlign: "center",
            fontSize: "3rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            textShadow: "1px 1px 5px black",
            letterSpacing: "0.1em",
            marginBottom: "2.5rem",
            boxShadow: "0 0 20px rgba(255,255,255,0.2)",
          }}
        >Recent Stories 📚</h2>
        {stories.length ? (
          stories.map((story) => (
            <div key={story._id} className="story-card">
              <h3>{story.title}</h3>
              <p>{story.content}</p>

              {story.parentStory && (
                <div className="parent-story-box">
                  <p><strong>Origin Universe 🌌</strong></p>
                  <p><strong>{story.parentStory.title}</strong></p>
                  <p>{story.parentStory.content}</p>
                  <p><em>By: {story.parentStory.author.username}</em></p>
                </div>
              )}

              <p>
                <strong>By:</strong> {story.author.username}
                {isUserLoggedIn && story.author._id !== currentUserId && (
                  <span style={{ marginLeft: "10px" }}>
                    {followingIds.includes(story.author._id) ? (
                      <span style={{ color: "limegreen" }}>✅ Following</span>
                    ) : (
                      <button onClick={() => handleFollowClick(story.author._id)}>
                        ➕ Follow
                      </button>
                    )}
                  </span>
                )}
              </p>

              <div className="action-btn-group">
                <button onClick={() => handleLikeClick(story._id)}>❤️ Vote ({story.likes || 0})</button>
                <button onClick={() => handleBranch(story._id)}>🌱 Branch</button>
                <button onClick={() => handleThread(story._id)}>💬 Thread</button>
                {isUserLoggedIn && currentUserId === story.author._id && (
                  <button onClick={() => handleDelete(story._id)}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ccc",
                    color: "#333",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    boxShadow: "0 0 10px rgba(246, 32, 32, 0.4)",
                    transition: "background-color 0.3s ease"
                  }}>🗑️ Delete</button>
                )}
              </div>

              <div className="comments-section">
                {story.comments.length ? (
                  story.comments.map((c) => (
                    <div key={c._id} className="comment-card">
                      <p><strong>{c.author.username}:</strong> {c.content}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#ccc" }}>No threads yet.</p>
                )}
              </div>

              {story.branches?.length ? (
                <div className="branches-list">
                  <p><strong>🌱 Branches:</strong></p>
                  {story.branches.map((branch) => (
                    <div key={branch._id} className="branch-card">
                      <p><strong>{branch.title}</strong></p>
                      <p>{branch.content}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <p className="no-stories-msg">No Origin Multiverses available. Start one! 📚</p>
        )}
      </div>

      {/* Modals */}
      {showLogin && <Login onClose={() => setShowLogin(false)} switchToJoinUs={() => { setShowLogin(false); setShowJoinUs(true); }} />}
      {showJoinUs && <JoinUs onClose={() => setShowJoinUs(false)} switchToLogin={() => { setShowJoinUs(false); setShowLogin(true); }} />}
      {showOopsModal && <OOPSModal onClose={() => setShowOopsModal(false)} switchToLogin={() => { setShowOopsModal(false); setShowLogin(true); }} switchToJoinUs={() => { setShowOopsModal(false); setShowJoinUs(true); }} />}
      {activeStoryId && <AddComment storyId={activeStoryId} onClose={() => setActiveStoryId(null)} />}
      {branchStoryId && <BranchStory parentStoryId={branchStoryId} onClose={() => setBranchStoryId(null)} />}
      {showCreateStory && <CreateStory onClose={() => setShowCreateStory(false)} />}
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
