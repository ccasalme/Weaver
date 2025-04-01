import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "../graphql/queries";
import "./Wireframe.css";
import fallbackAvatar from "../assets/fallbackAvatar.png"; // or use any placeholder URL

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
    bio: string;
    avatar: string;
    followers: { username: string }[];
    sharedStories: Story[];
    likedStories: Story[];
    branchedStories: Story[];
  };
}

const dummyProfile: ProfileData["myProfile"] = {
  bio: "Just your friendly neighbourhood thread weaver. 🕸️",
  avatar: fallbackAvatar || "../assets/fallbackAvatar.png",
  followers: [{ username: "ironfan" }, { username: "strangelycool" }],
  sharedStories: [
    {
      _id: "1",
      title: "🕷️ Spidey Origins",
      content: "Bitten by a radioactive spider... you know the rest.",
      comments: [
        {
          _id: "c1",
          content: "Iconic.",
          author: { username: "webhead99" },
        },
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
        {
          _id: "c2",
          content: "Chills 😱",
          author: { username: "symbiobae" },
        },
      ],
    },
  ],
};

const Profile: React.FC = () => {
  const { error, data } = useQuery<ProfileData>(GET_MY_PROFILE);
  const [activeTab, setActiveTab] = useState<"stories" | "branches" | "likes">("stories");
  const [expandedThreads, setExpandedThreads] = useState<{ [storyId: string]: boolean }>({});

  const profile = data?.myProfile ?? dummyProfile;

  const handleToggleThreads = (storyId: string) => {
    setExpandedThreads((prev) => ({
      ...prev,
      [storyId]: !prev[storyId],
    }));
  };

  const renderStoryList = (stories: Story[]) => (
    <ul className="story-list">
      {stories.map((story) => (
        <li key={story._id} className="story-item">
          <strong>{story.title}</strong>
          {story.comments.length > 0 && (
            <button onClick={() => handleToggleThreads(story._id)} className="see-threads-btn">
              {expandedThreads[story._id] ? "🔽 Hide Threads" : "🧵 See All Threads"}
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
        </li>
      ))}
    </ul>
  );

  return (
    <div className="profile-container">
      <img src={profile.avatar} alt="Profile Avatar" className="profile-avatar" />
      <h2>My Profile</h2>
      <p>{profile.bio}</p>
      <p>👥 Followers: {profile.followers.length}</p>

      {/* Tabs */}
      <div className="tab-group">
        <button
          onClick={() => setActiveTab("stories")}
          className={activeTab === "stories" ? "active-tab" : ""}
        >
          📚 My Stories
        </button>
        <button
          onClick={() => setActiveTab("branches")}
          className={activeTab === "branches" ? "active-tab" : ""}
        >
          🌱 My Branches
        </button>
        <button
          onClick={() => setActiveTab("likes")}
          className={activeTab === "likes" ? "active-tab" : ""}
        >
          ❤️ Liked Stories
        </button>
      </div>

      {/* Story Content */}
      {activeTab === "stories" && renderStoryList(profile.sharedStories)}
      {activeTab === "branches" && renderStoryList(profile.branchedStories)}
      {activeTab === "likes" && renderStoryList(profile.likedStories)}

      {error && (
        <p style={{ color: "orange", marginTop: "2rem", textAlign: "center" }}>
          ⚠️ You’re viewing a <strong>dummy profile</strong> while the server is offline.
        </p>
      )}
    </div>
  );
};

export default Profile;
