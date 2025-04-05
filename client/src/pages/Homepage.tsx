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

interface Author {
  _id: string;
  username: string;
}

interface Comment {
  _id: string;
  content: string;
  author: Author;
}

interface Story {
  _id: string;
  title: string;
  content: string;
  likes: number;
  author: Author;
  comments: Comment[];
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
  // Removed unused state variable 'followedUserId'
  const displayName = (user?: { username?: string }) => user?.username?.trim();

  const storyContainerRef = useRef<HTMLDivElement>(null);

  const { data: meData } = useQuery(GET_ME);
  const { data: profileData, refetch: refetchProfile } = useQuery(GET_MY_PROFILE);
  const isUserLoggedIn = !!meData?.me;
  const currentUserId = meData?.me?._id || null;
  const followingIds = profileData?.myProfile?.following?.map((f: { _id: string }) => f._id) || [];

  const { data, fetchMore, refetch } = useQuery(GET_STORIES, {
    variables: { offset: 0, limit: 6 },
    fetchPolicy: "network-only",
    pollInterval: 10000,
  });

  const [likeStory] = useMutation(LIKE_STORY, { onCompleted: () => refetch() });

  const [followUser] = useMutation(FOLLOW_USER, {
    onCompleted: () => {
      refetchProfile();
      // Removed unused state updates for 'followedUserId'
    },
    update(cache, { data }) {
      const existing = cache.readQuery<{ myProfile: { following: { _id: string }[] } }>({
        query: GET_MY_PROFILE,
      });
      if (existing && data?.followUser) {
        const alreadyFollowing = existing.myProfile.following.some(f => f._id === data.followUser._id);
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

          >Welcome to Weaver!</h2>
          <p className="auth-text"
                                >Join us to explore, create, and engage with stories.</p>
          <button onClick={() => setShowLogin(true)} className="login-btn"
            >Login</button>
          <button onClick={() => setShowJoinUs(true)} className="join-btn"
            >Join Us</button>
        </div>
      )}

      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <button
          className="create-story-btn"
          onClick={() => {
            if (!isUserLoggedIn) return setShowOopsModal(true);
            setShowCreateStory(true);
          }}
          style={{
            padding: "2.5rem 2.5rem",
            fontWeight: "bold",
            boxShadow: "0 0 10px rgba(0, 255, 255, 0.4)",
          }}
        >
          + Create a New Origin
        </button>
      </div>

      <div className="story-feed">
        <h2 className="story-feed-title"
        >Recent Stories 📚</h2>
        {stories.length ? (
          stories.map((story) => (
            <div key={story._id} 
            className="story-card"
              >
              <div className="origin-block">
                <h3>🕸️Title: {story.title}🕷️
                  <br></br>
                  <strong>By: </strong> @{story.author.username}
                  </h3>
                  <br></br>
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
                <p>{story.content}</p>


              {/* If it has a parent origin */}
                {story.parentStory && (
                <div className="origin-details">
                  <h4 style={{color:"whitesmoke"}}>🌌 Origin Universe</h4>
                    <p><strong>Title: {story.parentStory.title}, 
                      <br></br>
                      <em>By: @{story.parentStory.author.username}</em></strong>
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
                    <p><strong>Branched Universe
                      <br></br>
                       🌱
                      <br></br>
                        <em>Title: {branch.title}</em>
                        <br></br>
                         By: @{displayName(branch.author)}</strong>
                         <br></br>
                         <br></br>
                         {branch.content}
                         </p>
                 </div>
              ))}
                </div>
    )}
        </div>

              <div className="action-btn-group">
                <button onClick={() => handleLikeClick(story._id)}
                                                    style={{
                                                      color: "#333",
                                                      fontWeight: "bold"
                                                    }}
                                                    >❤️ Vote ({story.likes || 0})</button>
                <button onClick={() => handleBranch(story._id)}
                                                    style={{
                                                      color: "#333",
                                                      fontWeight: "bold",
                                                    }}>🌱 Branch</button>
                <button onClick={() => handleThread(story._id)}
                                  style={{
                                    color: "#333",
                                    fontWeight: "bold",
                                  }}>💬 Thread</button>
                {isUserLoggedIn && currentUserId === story.author._id && (
                  <button onClick={() => handleDelete(story._id)}
                  style={{
                    color: "#333",
                    fontWeight: "bold",
                    boxShadow: "0 0 10px rgba(246, 32, 32, 0.4)",
                  }}>🗑️ Delete</button>
                )}
              </div>

              <div className="comments-section">
                <h3>🧵🕸️Threads🕷️🧵</h3>
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


//*********************//
// Note from Cyrl:
//*********************//
  // 🕸️ Follow and following abilities is a future feature that I will be working on. 
  // I need to create a public profile for users

