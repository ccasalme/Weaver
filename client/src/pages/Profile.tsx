import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MY_PROFILE } from "../graphql/queries";
import { UPDATE_PROFILE, CREATE_STORY } from "../graphql/mutations";
import fallbackAvatar from "../assets/fallbackAvatar.png";
import DeleteStoryModal from "../components/DeleteStoryModal";
import "./Wireframe.css";

interface User {
  _id: string;
  username: string;
  email: string;
  fullName: string;
}

interface Story {
  _id: string;
  title: string;
  content: string;
  comments: {
    _id: string;
    content: string;
    author: {
      username: string;
    };
  }[];
}

interface ProfileData {
  myProfile: {
    user: User;
    bio: string;
    avatar: string;
    followers: User[];
    following: User[];
    sharedStories: Story[];
    likedStories: Story[];
    branchedStories: Story[];
  };
}

const Profile: React.FC = () => {
  const token = localStorage.getItem("id_token");
  const { loading, data, refetch } = useQuery<ProfileData>(GET_MY_PROFILE, { skip: !token });

  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [createStory] = useMutation(CREATE_STORY);

  const [activeTab, setActiveTab] = useState<"stories" | "branches" | "likes">("stories");
  const [expandedThreads, setExpandedThreads] = useState<{ [storyId: string]: boolean }>({});
  const [editing, setEditing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [storyToDelete, setStoryToDelete] = useState<string | null>(null);

  if (!token) {
    return (
      <div className="profile-container">
        <h2 className="username-heading">@spideynomoney</h2>
        <p>Just your friendly neighbourhood thread weaver. 🕸️</p>
        <p>👥 2 Followers</p>
        <p>You’re viewing a <strong>dummy profile</strong> — please login to access your data.</p>
      </div>
    );
  }

  if (loading) return <p className="loading">Loading profile... 🧵</p>;

  const profile = data?.myProfile;
  if (!profile) {
    return <div className="profile-container"><h2>Failed to load profile</h2></div>;
  }

  const handleToggleThreads = (storyId: string) => {
    setExpandedThreads((prev) => ({ ...prev, [storyId]: !prev[storyId] }));
  };

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

  const handleCreateStory = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      alert("Please fill in both the title and story content.");
      return;
    }
    try {
      await createStory({ variables: { title: newTitle.trim(), content: newContent.trim() } });
      setNewTitle("");
      setNewContent("");
      alert("Story created successfully! 🎉");
      refetch();
    } catch (err) {
      console.error("Story creation failed", err);
    }
  };

  const renderStoryList = (stories: Story[]) => (
    <div className="story-feed">
      {stories.map((story) => (
        <div key={story._id} className="story-card">
          <h3>{story.title}</h3>
          <p>{story.content}</p>
          {story.comments.length > 0 && (
            <button onClick={() => handleToggleThreads(story._id)} className="see-threads-btn">
              {expandedThreads[story._id] ? "🔽 Hide Threads" : "🧵 See Threads"}
            </button>
          )}
          {expandedThreads[story._id] && (
            <ul className="comment-thread">
              {story.comments.map((comment) => (
                <li key={comment._id}><strong>{comment.author.username}:</strong> {comment.content}</li>
              ))}
            </ul>
          )}
          <button onClick={() => setStoryToDelete(story._id)} className="delete-btn">
            🗑️ Delete Origin
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="page-container">
      <div className="profile-header">
        <img src={profile.avatar || fallbackAvatar} alt="Profile" className="profile-pic" />
        <div>
          <h2 className="username-heading">@{profile.user.username}</h2>
          <p className="profile-fullname">{profile.user.fullName}</p>

          {editing ? (
            <>
              <textarea placeholder="New bio" value={newBio} onChange={(e) => setNewBio(e.target.value)} />
              <input type="file" accept="image/*" onChange={(e) => setNewAvatarFile(e.target.files?.[0] || null)} />
              <button onClick={handleProfileUpdate}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <p className="profile-bio">{profile.bio || "No bio yet."}</p>
              <p className="profile-followers">
                👥 <button onClick={() => setShowFollowers(!showFollowers)}>
                  {profile.followers.length} Followers
                </button>
                {" | "}
                <button onClick={() => setShowFollowing(!showFollowing)}>
                  {profile.following.length} Following
                </button>
              </p>
              <button onClick={() => setEditing(true)}>Edit Profile</button>
            </>
          )}

          {showFollowers && (
            <div className="follower-modal">
              <h4>Followers</h4>
              <ul>{profile.followers.map((f) => <li key={f._id}>@{f.username}</li>)}</ul>
            </div>
          )}
          {showFollowing && (
            <div className="following-modal">
              <h4>Following</h4>
              <ul>{profile.following.map((f) => <li key={f._id}>@{f.username}</li>)}</ul>
            </div>
          )}
        </div>
      </div>

      <div className="tab-group">
        <button onClick={() => setActiveTab("stories")} className={activeTab === "stories" ? "active-tab" : ""}>📚 Stories</button>
        <button onClick={() => setActiveTab("branches")} className={activeTab === "branches" ? "active-tab" : ""}>🌱 Branches</button>
        <button onClick={() => setActiveTab("likes")} className={activeTab === "likes" ? "active-tab" : ""}>❤️ Likes</button>
      </div>

      {activeTab === "stories" && (
        <>
          <div className="create-story-form">
            <h3>Create a New Origin 📖</h3>
            <input type="text" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <textarea placeholder="Tell your story..." value={newContent} onChange={(e) => setNewContent(e.target.value)} />
            <button onClick={handleCreateStory}>🚀 Submit Origin</button>
          </div>
          {renderStoryList(profile.sharedStories)}
        </>
      )}

      {activeTab === "branches" && renderStoryList(profile.branchedStories)}
      {activeTab === "likes" && renderStoryList(profile.likedStories)}

      {/* ✅ Guilt-trip Delete Modal */}
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
