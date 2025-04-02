import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MY_PROFILE } from "../graphql/queries";
import { UPDATE_PROFILE, CREATE_STORY, DELETE_STORY } from "../graphql/mutations";
import fallbackAvatar from "../assets/fallbackAvatar.png";
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

const dummyProfile: ProfileData["myProfile"] = {
  user: {
    _id: "dummy",
    username: "spideynomoney",
    email: "spidey@threads.com",
    fullName: "Peter Parker",
  },
  bio: "Just your friendly neighbourhood thread weaver. 🕸️",
  avatar: fallbackAvatar,
  followers: [
    { _id: "1", username: "ironfan", email: "", fullName: "Tony Stark" },
    { _id: "2", username: "strangelycool", email: "", fullName: "Stephen Strange" },
  ],
  following: [
    { _id: "3", username: "legend27", email: "", fullName: "Thor Odinson" },
    { _id: "4", username: "webwitch", email: "", fullName: "Wanda Maximoff" },
  ],
  sharedStories: [
    {
      _id: "1",
      title: "🕷️ Spidey Origins",
      content: "Bitten by a radioactive spider... you know the rest.",
      comments: [
        { _id: "c1", content: "Iconic.", author: { username: "webhead99" } },
      ],
    },
  ],
  branchedStories: [
    {
      _id: "2",
      title: "🧬 Multiverse Madness",
      content: "What if Gwen never fell?",
      comments: [],
    },
  ],
  likedStories: [
    {
      _id: "3",
      title: "🕸️ Venom's Side",
      content: "A misunderstood monster. Or something worse?",
      comments: [
        { _id: "c2", content: "Chills 😱", author: { username: "symbiobae" } },
      ],
    },
  ],
};

const Profile: React.FC = () => {
  const token = localStorage.getItem("id_token");
  const { loading, data } = useQuery<ProfileData>(GET_MY_PROFILE, {
    skip: !token,
  });

  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [createStory] = useMutation(CREATE_STORY);
  const [deleteStory] = useMutation(DELETE_STORY);

  const [activeTab, setActiveTab] = useState<"stories" | "branches" | "likes">("stories");
  const [expandedThreads, setExpandedThreads] = useState<{ [storyId: string]: boolean }>({});
  const [editing, setEditing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newGenre, setNewGenre] = useState("");

  if (!token) {
    return (
      <div className="profile-container">
        <h2 className="username-heading">@{dummyProfile.user.username}</h2>
        <p>{dummyProfile.bio}</p>
        <p>👥 {dummyProfile.followers.length} Followers</p>
        <p>You’re viewing a <strong>dummy profile</strong> — please login to access your data.</p>
      </div>
    );
  }

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

  const handleCreateStory = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      alert("Please fill in both the title and story content.");
      return;
    }
    try {
      await createStory({ variables: { title: newTitle, content: newContent } });
      setNewTitle("");
      setNewContent("");
      setNewGenre("");
      alert("Story created successfully! 🎉");
    } catch (err) {
      console.error("Story creation failed", err);
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
          <button onClick={() => {
            if (window.confirm("Are you sure you want to delete this story?")) {
              deleteStory({ variables: { storyId: story._id } }).then(() => window.location.reload());
            }
          }}>🗑️ Delete</button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profile.avatar} alt="Profile" className="profile-pic" />
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
              <p className="profile-bio">{profile.bio}</p>
              <p className="profile-followers">
                👥 <button onClick={() => setShowFollowers(!showFollowers)}>
                  {profile.followers?.length ?? 0} Followers
                </button>
                {' | '}
                <button onClick={() => setShowFollowing(!showFollowing)}>
                  {profile.following?.length ?? 0} Following
                </button>
              </p>
              <button onClick={() => setEditing(true)}>Edit Profile</button>
            </>
          )}

          {showFollowers && (
            <div className="follower-modal">
              <h4>Followers</h4>
              <ul>
                {profile.followers.map((f, i) => (
                  <li key={i}>@{f.username}</li>
                ))}
              </ul>
            </div>
          )}
          {showFollowing && (
            <div className="following-modal">
              <h4>Following</h4>
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
        <button onClick={() => setActiveTab("stories")} className={activeTab === "stories" ? "active-tab" : ""}>📚 Stories</button>
        <button onClick={() => setActiveTab("branches")} className={activeTab === "branches" ? "active-tab" : ""}>🌱 Branches</button>
        <button onClick={() => setActiveTab("likes")} className={activeTab === "likes" ? "active-tab" : ""}>❤️ Likes</button>
      </div>

      {activeTab === "stories" && (
        <div className="create-story-form">
          <h3>Create a New Origin 📖</h3>
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            placeholder="Tell your story..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <select value={newGenre} onChange={(e) => setNewGenre(e.target.value)}>
            <option value="">Select Genre</option>
            <option value="Sci-fi">Sci-fi</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Adventure">Adventure</option>
            <option value="Horror">Horror</option>
            <option value="YoungAdult">Young Adult</option>
            <option value="Thriller">Thriller</option>
            <option value="FanFiction">Fan Fiction</option>
            <option value="Adult18+">Adult 18+</option>
          </select>
          <button onClick={handleCreateStory}>Submit Origin</button>
        </div>
      )}

      {activeTab === "stories" && renderStoryList(profile.sharedStories)}
      {activeTab === "branches" && renderStoryList(profile.branchedStories)}
      {activeTab === "likes" && renderStoryList(profile.likedStories)}
    </div>
  );
};

export default Profile;
