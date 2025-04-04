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
          <h2 className="auth-title"
                      style={{
                        color: "white",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "block",
                        padding: "2rem 2rem",
                        textAlign: "center",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        textShadow: "0 0 20px rgba(18, 44, 55, 0.2)",
                        letterSpacing: "0.1em",
                        marginBottom: "0rem",
                        marginTop: "0rem",
                        width: "100%",
                        boxShadow: "0 0 20px rgba(255,255,255,0.2)",
                        margin: "5rem 5rem",
                      }}
          >Welcome to Weaver!</h2>
          <p className="auth-text"
                                style={{
                                  color: "white",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  display: "block",
                                  padding: "2rem 2rem",
                                  textAlign: "center",
                                  fontSize: "2rem",
                                  fontWeight: "bold",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.1em",
                                  marginBottom: "0rem",
                                  marginTop: "0rem",
                                  width: "100%",
                                  margin: "5rem 5rem",
                                  textShadow: "0 0 20px rgba(18, 44, 55, 0.2)",
                                }}>Join us to explore, create, and engage with stories.</p>
          <button onClick={() => setShowLogin(true)} className="login-btn"
                                              style={{
                                                marginBottom: "1rem",
                                                backgroundColor: "#444",
                                                color: "#333",
                                                padding: "1rem 1rem",
                                                borderRadius: "6px",
                                                border: "none",
                                                cursor: "pointer",
                                                fontWeight: "bold",
                                                fontSize: "1.5rem",
                                                boxShadow: "0 0 10px rgba(0, 255, 255, 0.4)",
                                                transition: "background-color 0.3s ease"
                                              }}
            >Login</button>
          <button onClick={() => setShowJoinUs(true)} className="join-btn"
                                              style={{
                                                marginBottom: "1rem",
                                                backgroundColor: "#444",
                                                color: "#333",
                                                padding: "1rem 1rem",
                                                borderRadius: "6px",
                                                border: "none",
                                                cursor: "pointer",
                                                fontWeight: "bold",
                                                fontSize: "1.5rem",
                                                boxShadow: "0 0 10px rgba(0, 255, 255, 0.4)",
                                                transition: "background-color 0.3s ease"
                                              }}
            >Join Us</button>
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
            padding: "1rem 1.5rem",
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
            <div key={story._id} 
            className="story-card"
            style={{
                color: "white",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "12px",
                justifyContent: "center",
                alignItems: "center",
                display: "block",
                padding: "2rem 2rem",
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                textShadow: "1px 1px 5px black",
                letterSpacing: "0.1em",
                marginBottom: "0rem",
                marginTop: "0rem",
                width: "100%",
                backgroundColor: "#444",
                boxShadow: "0 0 20px rgba(255,255,255,0.2)",
                margin: "5rem 5rem",
              }}>
              <h3>
                <strong>Most Recent Post:</strong> 
                <br></br> 
                <br></br>{story.title} || <strong>By:</strong> @{story.author.username}</h3>
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
              <p
              style={{
                boxShadow: "0 0 20px rgba(255,255,255,0.2)",
              }}>{story.content}</p>
              <div className="origin-block">
                <h3>{story.title} || <strong>By:</strong> {story.author.username}</h3>
                <p>{story.content}</p>


              {/* If it has a parent origin */}
                {story.parentStory && (
                <div className="origin-details">
                  <h4 style={{color:"whitesmoke"}}>🌌 Origin Universe</h4>
                    <p><strong>{story.parentStory.title}, 
                      <br></br>
                      <em>By: {story.parentStory.author.username}</em></strong>
                      <br></br>
                      <br></br>
                      🕸️🕸️🕸️
                      <br></br>
                      <br></br>
                      {story.parentStory.content}
                      </p>

              </div>
                )}

              {/* Branches if they exist */}
              {story.branches && story.branches.length > 0 && (
                <div className="origin-branches">
                    <h4 style={{color:"whitesmoke"}}>🌱 Branches</h4>
                    {story.branches.map((branch) => (
                    <div key={branch._id} className="branch-entry">
                    <p><strong>{branch.title}, By: {story.parentStory?.author?.username || "Unknown"}</strong></p>
                    <p>{branch.content}</p>
                 </div>
              ))}
                </div>
    )}
        </div>

              <div className="action-btn-group">
                <button onClick={() => handleLikeClick(story._id)}
                                                    style={{
                                                      marginBottom: "1rem",
                                                      backgroundColor: "#444",
                                                      color: "#333",
                                                      padding: "1rem 1rem",
                                                      borderRadius: "6px",
                                                      border: "none",
                                                      cursor: "pointer",
                                                      fontWeight: "bold",
                                                      fontSize: "1.5rem",
                                                      boxShadow: "0 0 10px rgba(0, 255, 255, 0.4)",
                                                      transition: "background-color 0.3s ease"
                                                    }}>❤️ Vote ({story.likes || 0})</button>
                <button onClick={() => handleBranch(story._id)}
                                                    style={{
                                                      marginBottom: "1rem",
                                                      backgroundColor: "#444",
                                                      color: "#333",
                                                      padding: "1rem 1rem",
                                                      borderRadius: "6px",
                                                      border: "none",
                                                      cursor: "pointer",
                                                      fontWeight: "bold",
                                                      fontSize: "1.5rem",
                                                      boxShadow: "0 0 10px rgba(0, 255, 255, 0.4)",
                                                      transition: "background-color 0.3s ease"
                                                    }}>🌱 Branch</button>
                <button onClick={() => handleThread(story._id)}
                                  style={{
                                    marginBottom: "1rem",
                                    backgroundColor: "#444",
                                    color: "#333",
                                    padding: "1rem 1rem",
                                    borderRadius: "6px",
                                    border: "none",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    fontSize: "1.5rem",
                                    boxShadow: "0 0 10px rgba(0, 255, 255, 0.4)",
                                    transition: "background-color 0.3s ease"
                                  }}>💬 Thread</button>
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
                <h3>🧵🕸️Threads🕷️🕸️🧵</h3>
                {story.comments.length ? (
                  story.comments.map((c) => (
                    <div key={c._id} className="comment-card">
                      <p><strong>By: @{c.author.username}:</strong>
                      <br></br>
                      <br></br> 
                      🕸️🕸️🕸️
                      <br></br>
                      <br></br>
                      {c.content}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#ccc" }}>No threads yet.</p>
                )}
              </div>
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
