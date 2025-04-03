// src/pages/Profile.tsx
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MY_PROFILE } from "../graphql/queries";
import { UPDATE_PROFILE } from "../graphql/mutations";
import fallbackAvatar from "../assets/fallbackAvatar.png";
import DeleteStoryModal from "../components/DeleteStoryModal";
import CreateStory from "../components/CreateStory";
import "./Wireframe.css";
import HeroBanner from "../assets/weaverBanner.png";

// Types
interface User {
  _id: string;
  username: string;
  fullName: string;
}

interface Comment {
  _id: string;
  content: string;
  author: User;
}

interface Story {
  _id: string;
  title: string;
  content: string;
  likes: number;
  comments?: Comment[] | null;
  branches?: { _id: string; title: string }[];
  parentStory?: { _id: string; title: string } | null;
}

interface ProfileData {
  myProfile: {
    _id: string;
    avatar?: string;
    bio?: string;
    user: User;
    followers?: User[];
    sharedStories: Story[];
    likedStories: Story[];
    branchedStories: Story[];
  };
}

const Profile: React.FC = () => {
  const { loading, data, refetch } = useQuery<ProfileData>(GET_MY_PROFILE, {
    fetchPolicy: "network-only",
  });
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const [activeTab, setActiveTab] = useState<"stories" | "branches" | "likes">("stories");
  const [editing, setEditing] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState<string | null>(null);
  const [expandedThreads, setExpandedThreads] = useState<Record<string, boolean>>({});

  if (loading) return <p className="loading">Loading profile... 🧵</p>;
  const profile = data?.myProfile;

  if (!profile) {
    return (
      <div className="profile-container">
        <h2>Failed to load profile</h2>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  const handleProfileUpdate = async () => {
    try {
      let avatar = profile.avatar;
      if (newAvatarFile) avatar = URL.createObjectURL(newAvatarFile);

      await updateProfile({
        variables: {
          bio: newBio.trim() || profile.bio || "",
          avatar: avatar || fallbackAvatar,
        },
      });

      window.location.reload();
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  const renderStoryList = (stories: Story[]) => (
    <div className="story-feed">
      {stories.map((story) => (
        <div key={story._id} className="story-card">
          <h3>{story.title}</h3>
          <p>{story.content}</p>

          {Array.isArray(story.comments) && story.comments.length > 0 && (
            <button
              onClick={() =>
                setExpandedThreads((prev) => ({
                  ...prev,
                  [story._id]: !prev[story._id],
                }))
              }
              className="see-threads-btn"
            >
              {expandedThreads[story._id] ? "🔽 Hide Threads" : "🧵 See Threads"}
            </button>
          )}

          {expandedThreads[story._id] && Array.isArray(story.comments) && (
            <ul className="comment-thread">
              {story.comments.map((comment) => (
                <li key={comment._id}>
                  <strong>{comment.author.username}:</strong> {comment.content}
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={() => setStoryToDelete(story._id)}
            className="delete-btn"
          >
            🗑️ Delete Origin
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="page-container">
      <div className="banner-container">
        <img src={HeroBanner} alt="Weaver Banner" className="hero-banner" style={{ height: "500px" }} />
      </div>

      <div className="profile-header">
        <img src={profile.avatar || fallbackAvatar} alt="Profile" className="profile-pic" />
        <div>
          <h2 className="username-heading">@{profile.user.username}</h2>
          <p className="profile-fullname">{profile.user.fullName}</p>

          {editing ? (
            <>
              <textarea
                placeholder="New bio"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewAvatarFile(e.target.files?.[0] || null)}
              />
              <button onClick={handleProfileUpdate}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <p className="profile-bio">{profile.bio || "No bio yet."}</p>
              <p className="profile-followers">
                👥{" "}
                <button onClick={() => setShowFollowers(!showFollowers)}>
                  {profile.followers?.length ?? 0} Followers
                </button>{" "}
                |{" "}
                <button onClick={() => setShowFollowing(!showFollowing)}>
                  {profile.followers?.length ?? 0} Following
                </button>
              </p>
              <button onClick={() => setEditing(true)}>Edit Profile</button>
            </>
          )}

          {showFollowers && (
            <div className="follower-modal">
              <h4>Followers</h4>
              <ul>
                {profile.followers?.map((f) => (
                  <li key={f._id}>@{f.username}</li>
                ))}
              </ul>
            </div>
          )}

          {showFollowing && (
            <div className="following-modal">
              <h4>Following</h4>
              <ul>
                <li>(Following logic coming soon)</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="tab-group">
        <button
          onClick={() => setActiveTab("stories")}
          className={activeTab === "stories" ? "active-tab" : ""}
        >
          📚 Stories
        </button>
        <button
          onClick={() => setActiveTab("branches")}
          className={activeTab === "branches" ? "active-tab" : ""}
        >
          🌱 Branches
        </button>
        <button
          onClick={() => setActiveTab("likes")}
          className={activeTab === "likes" ? "active-tab" : ""}
        >
          ❤️ Likes
        </button>
      </div>

      {activeTab === "stories" && (
        <>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                background: "#fff",
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              + Create a New Origin
            </button>
          </div>
          {renderStoryList(profile.sharedStories)}
        </>
      )}

      {activeTab === "branches" && renderStoryList(profile.branchedStories)}
      {activeTab === "likes" && renderStoryList(profile.likedStories)}

      {showCreateModal && (
        <CreateStory
          onClose={() => setShowCreateModal(false)}
          onCreated={refetch}
        />
      )}

      {storyToDelete && (
        <DeleteStoryModal
          storyId={storyToDelete}
          onClose={() => setStoryToDelete(null)}
          onDeleted={() => {
            setStoryToDelete(null);
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default Profile;
