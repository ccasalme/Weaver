// src/pages/Profile.tsx
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_MY_PROFILE
} from "../graphql/queries";
import {
  UPDATE_PROFILE,
  LIKE_STORY,
  // FOLLOW_USER,
  UNFOLLOW_USER
} from "../graphql/mutations";
import fallbackAvatar from "../assets/fallbackAvatar.png";
import DeleteStoryModal from "../components/DeleteStoryModal";
import CreateStory from "../components/CreateStory";
import "./Wireframe.css";
import HeroBanner from "../assets/weaverBanner.png";

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
    following?: User[];
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
  const [toggleLike] = useMutation(LIKE_STORY, { onCompleted: () => refetch() });
  // const [followUser] = useMutation(FOLLOW_USER, { onCompleted: () => refetch() });
  const [unfollowUser] = useMutation(UNFOLLOW_USER, { onCompleted: () => refetch() });

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
  if (!profile) return <div>Profile not found.</div>;

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

  const handleUnlike = async (storyId: string) => {
    try {
      await toggleLike({ variables: { storyId } });
    } catch (err) {
      console.error("Failed to unlike story:", err);
    }
  };

  // const handleFollow = async (userId: string) => {
  //   try {
  //     await followUser({ variables: { targetUserId: userId } });
  //   } catch (err) {
  //     console.error("Follow failed:", err);
  //   }
  // };

  const handleUnfollow = async (userId: string) => {
    try {
      await unfollowUser({ variables: { targetUserId: userId } });
    } catch (err) {
      console.error("Unfollow failed:", err);
    }
  };

  const renderStoryList = (stories: Story[], isLikedTab = false) => (
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

          {expandedThreads[story._id] && (
            <ul className="comment-thread">
              {story.comments?.map((comment) => (
                <li key={comment._id}>
                  <strong>{comment.author.username}:</strong> {comment.content}
                </li>
              ))}
            </ul>
          )}

          {isLikedTab ? (
            <button onClick={() => handleUnlike(story._id)} className="delete-btn"
            style={{
              backgroundColor: "#ccc",
              boxShadow: "0 0 50px rgba(142, 26, 26, 0.4)",
            }}
            >
              ❌ Remove from Likes
            </button>
          ) : (
            <button onClick={() => setStoryToDelete(story._id)} className="delete-btn"
            style={{
              borderRadius: "10px",
              boxShadow: "0 0 50px rgba(142, 26, 26, 0.4)",
            }}>
              🗑️ Delete Origin
            </button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="page-container">
      <div className="banner-container">
        <img src={HeroBanner} alt="Weaver Banner" className="hero-banner" />
      </div>

      <div className="profile-header">
        <img src={profile.avatar || fallbackAvatar} alt="Profile" className="profile-pic" />
        <div>
          <h2
            className="username-heading">
            @{profile.user.username}
          </h2>
          <p className="profile-fullname">{profile.user.fullName}</p>

          {editing ? (
            <>
              <textarea
                placeholder="New bio"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                className="bio-input"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewAvatarFile(e.target.files?.[0] || null)}
              />
              <button onClick={handleProfileUpdate}
              className="save-btn">Save</button>
              <button onClick={() => setEditing(false)}
              className="cancel-btn">Cancel</button>
            </>
          ) : (
            <>
              <p className="profile-bio">{profile.bio || "No bio yet."}</p>
              <p className="profile-followers">
                👥{" "}
                <button onClick={() => setShowFollowers(!showFollowers)}
                className="profile-followers-btn">
                  {profile.followers?.length ?? 0} Followers
                </button>{" "}
                |{" "}
                <button onClick={() => setShowFollowing(!showFollowing)}
                className="profile-followers-btn">
                  {profile.following?.length ?? 0} Following
                </button>
              </p>
              <button onClick={() => setEditing(true)} className="edit-btn">Edit Profile</button>
            </>
          )}

          {showFollowers && (
            <div className="follower-modal">
              <h4
                        style={{
                          color: "white",
                          background: "linear-gradient(to right, #3e5151, #decba4)",
                          fontSize: "1.3rem",
                        }}
                        >Followers</h4>
              <ul>
                {profile.followers?.map((f) => (
                  <li key={f._id}
                  className="profile-followers-list">
                    @{f.username}{" "}
                    <br></br>
                    <button onClick={() => handleUnfollow(f._id)} className="profile-followers-btn">Unfollow</button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showFollowing && (
            <div className="following-modal">
              <h4
                        style={{
                          color: "white",
                          background: "linear-gradient(to right, #3e5151, #decba4)",
                          fontSize: "1.3rem",
                        }}
                        >Following</h4>
              <ul>
                {profile.following?.map((f) => (
                  <li key={f._id}
                  className="profile-followers-list">
                    @{f.username}{" "}
                    <br></br>
                    <button onClick={() => handleUnfollow(f._id)} className="profile-followers-btn">Unfollow</button>
                  </li>
                ))}
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
        <button onClick={() => setActiveTab("branches")} className={activeTab === "branches" ? "active-tab" : ""}
                    >
          🌱 Branches
        </button>
        <button onClick={() => setActiveTab("likes")} className={activeTab === "likes" ? "active-tab" : ""}
                    >
          ❤️ Likes
        </button>
      </div>

      {activeTab === "stories" && (
        <>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button
              className="create-origin-btn"
              onClick={() => setShowCreateModal(true)}
            >
              + Create a New Origin
            </button>
          </div>
          {renderStoryList(profile.sharedStories)}
        </>
      )}

      {activeTab === "branches" && renderStoryList(profile.branchedStories)}
      {activeTab === "likes" && renderStoryList(profile.likedStories, true)}

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
