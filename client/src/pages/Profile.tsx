import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MY_PROFILE } from "../graphql/queries";
import { UPDATE_PROFILE } from "../graphql/mutations";
import "./Wireframe.css";
import fallbackAvatar from "../assets/fallbackAvatar.png";

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
    username: string;
    bio: string;
    avatar: string;
    followers: { username: string }[];
    following: { username: string }[];
    sharedStories: Story[];
    likedStories: Story[];
    branchedStories: Story[];
  };
}

const dummyProfile: ProfileData["myProfile"] = {
  username: "spideynomoney",
  bio: "Just your friendly neighbourhood thread weaver. 🕸️",
  avatar: fallbackAvatar,
  followers: [{ username: "ironfan" }, { username: "strangelycool" }],
  following: [{ username: "legend27" }, { username: "webwitch" }],
  sharedStories: [
    {
      _id: "1",
      title: "🕷️ Spidey Origins",
      content: "Bitten by a radioactive spider... you know the rest.",
      comments: [{ _id: "c1", content: "Iconic.", author: { username: "webhead99" } }],
    },
  ],
  branchedStories: [
    { _id: "2", title: "🧬 Multiverse Madness", content: "What if Gwen never fell?", comments: [] },
  ],
  likedStories: [
    {
      _id: "3",
      title: "🕸️ Venom's Side",
      content: "A misunderstood monster. Or something worse?",
      comments: [{ _id: "c2", content: "Chills 😱", author: { username: "symbiobae" } }],
    },
  ],
};

const Profile: React.FC = () => {
  const { error, data } = useQuery<ProfileData>(GET_MY_PROFILE);
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [activeTab, setActiveTab] = useState<"stories" | "branches" | "likes">("stories");
  const [expandedThreads, setExpandedThreads] = useState<{ [storyId: string]: boolean }>({});
  const [editing, setEditing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);

  const profile = data?.myProfile ?? dummyProfile;

  const handleToggleThreads = (storyId: string) => {
    setExpandedThreads((prev) => ({
      ...prev,
      [storyId]: !prev[storyId],
    }));
  };

  const handleProfileUpdate = async () => {
    try {
      let avatar = profile.avatar;
      if (newAvatarFile) {
        avatar = URL.createObjectURL(newAvatarFile);
      }
      await updateProfile({ variables: { bio: newBio || profile.bio, avatar } });
      window.location.reload();
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  const renderStoryList = (stories: Story[]) => (
    <div className="story-list">
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
                <li key={comment._id}>
                  <strong>{comment.author.username}:</strong> {comment.content}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profile.avatar} alt="Profile" className="profile-pic" />
        <div>
          <h2 className="username-heading"
          style={{
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#2c3e50",
          display: "inline-block",
          margin: 0,
          textAlign: "center",
          width: "100%",
          fontSize: "2.5em",
          fontWeight: "bold",
          lineHeight: "1.5em",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "10px",
          textOverflow: "ellipsis",
          overflow: "hidden"
          }}>@{profile.username ?? "weaver"}</h2>
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
              <p className="profile-bio">{profile.bio}</p>
              <p className="profile-followers">
                👥 <button onClick={() => setShowFollowers(!showFollowers)}>
                  {profile.followers.length} Followers
                </button>
                {' | '}
                <button onClick={() => setShowFollowing(!showFollowing)}>
                  {profile.following.length} Following
                </button>
              </p>
              <button onClick={() => setEditing(true)}>Edit Profile</button>
            </>
          )}
          {showFollowers && (
            <div className="follower-modal">
              <h4
              style={{
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#2c3e50",
              display: "inline-block",
              margin: 0,
              textAlign: "center",
              width: "100%",
              fontSize: "2.5em",
              fontWeight: "bold",
              lineHeight: "1.5em",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "10px",
              textOverflow: "ellipsis",
              overflow: "hidden"
              }}
              >Followers</h4>
              <ul>
                {profile.followers.map((f, i) => (
                  <li key={i}>@{f.username}</li>
                ))}
              </ul>
            </div>
          )}
          {showFollowing && (
            <div className="following-modal">
              <h4
                    style={{
                      color: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      backgroundColor: "#2c3e50",
                      display: "inline-block",
                      margin: 0,
                      textAlign: "center",
                      width: "100%",
                      fontSize: "2.5em",
                      fontWeight: "bold",
                      lineHeight: "1.5em",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "10px",
                      textOverflow: "ellipsis",
                      overflow: "hidden"
                    }}
              >Following</h4>
              <ul>
                {profile.following.map((f, i) => (
                  <li key={i}>@{f.username}</li>
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
      {activeTab === "stories" && renderStoryList(profile.sharedStories)}
      {activeTab === "branches" && renderStoryList(profile.branchedStories)}
      {activeTab === "likes" && renderStoryList(profile.likedStories)}
      {error && (
        <p className="dummy-warning">
          ⚠️ You’re viewing a <strong>dummy profile</strong> while the server is offline.
        </p>
      )}
    </div>
  );
};

export default Profile;
