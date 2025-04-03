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
import { GET_STORIES, GET_ME } from "../graphql/queries";
import { CREATE_STORY, LIKE_STORY } from "../graphql/mutations";
import { isLoggedIn } from "../utils/auth";

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
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [stories, setStories] = useState<Story[]>([]);

  const storyContainerRef = useRef<HTMLDivElement>(null);

  const { data, fetchMore, refetch } = useQuery(GET_STORIES, {
    variables: { offset: 0, limit: 6 },
    fetchPolicy: "network-only",
  });

  const { data: meData } = useQuery(GET_ME, { skip: !isLoggedIn() });
  const isAuthenticated = !!meData?.me?._id;
  const currentUserId = meData?.me?._id || null;

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
        variables: {
          offset: stories.length,
          limit: 6,
        },
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
    if (!isAuthenticated) return setShowOopsModal(true);
    try {
      await likeStory({ variables: { storyId } });
    } catch (err) {
      console.error("Error liking:", err);
    }
  };

  const handleQuickCreateStory = async () => {
    if (!isAuthenticated) return setShowOopsModal(true);
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      await createStory({
        variables: {
          title: newTitle.trim(),
          content: newContent.trim(),
        },
      });
    } catch (err) {
      console.error("Error creating:", err);
    }
  };

  const handleThread = (id: string) => {
    if (!isAuthenticated) return setShowOopsModal(true);
    setActiveStoryId(id);
  };

  const handleBranch = (id: string) => {
    if (!isAuthenticated) return setShowOopsModal(true);
    setBranchStoryId(id);
  };

  const handleDelete = (id: string) => {
    if (!isAuthenticated) return setShowOopsModal(true);
    setStoryToDelete(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="page-container" ref={storyContainerRef} onScroll={handleScroll}>
      <div className="banner-container">
        <img src={HeroBanner} alt="Weaver Banner" className="hero-banner" />
        <img src={SecondBanner} alt="Weaver Banner 2" className="hero-banner-2" />
      </div>

      {!isAuthenticated && (
        <div className="auth-container">
          <h2 className="auth-title">Welcome to Weaver!</h2>
          <p className="auth-text">Join us to explore, create, and engage with stories.</p>
          <button onClick={() => setShowLogin(true)} className="login-btn">Login</button>
          <button onClick={() => setShowJoinUs(true)} className="join-btn">Join Us</button>
        </div>
      )}

      <div className="quick-create-story">
        <h3 style={{ color: "white" }}>Quick Origin Submission</h3>
        <input
          type="text"
          placeholder="Story Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="What's your origin story?"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows={4}
        />
        <button onClick={handleQuickCreateStory}>🚀 Submit Origin</button>
      </div>

      <div className="story-feed">
        <h2 className="story-feed-title">Recent Stories 📚</h2>
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

              <p><strong>By:</strong> {story.author.username}</p>

              <div className="action-btn-group">
                <button onClick={() => handleLikeClick(story._id)}>❤️ Vote ({story.likes || 0})</button>
                <button onClick={() => handleBranch(story._id)}>🌱 Branch</button>
                <button onClick={() => handleThread(story._id)}>💬 Thread</button>
                {isAuthenticated && currentUserId === story.author._id && (
                  <button onClick={() => handleDelete(story._id)}>🗑️ Delete</button>
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
