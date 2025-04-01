// src/pages/Profile.tsx
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "../graphql/queries";
import "./Wireframe.css";

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

const Profile: React.FC = () => {
  const { loading, error, data } = useQuery<ProfileData>(GET_MY_PROFILE);
  const [activeTab, setActiveTab] = useState<"stories" | "branches" | "likes">("stories");
  const [expandedThreads, setExpandedThreads] = useState<{ [storyId: string]: boolean }>({});

  if (loading) return <p>Loading profile... ⌛</p>;
  if (error) return <p>Error loading profile! ❌</p>;

  const { bio, avatar, followers, sharedStories, likedStories, branchedStories } = data!.myProfile;

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
      <img src={avatar} alt="Profile Avatar" className="profile-avatar" />
      <h2>My Profile</h2>
      <p>{bio}</p>
      <p>👥 Followers: {followers.length}</p>

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
      {activeTab === "stories" && renderStoryList(sharedStories)}
      {activeTab === "branches" && renderStoryList(branchedStories)}
      {activeTab === "likes" && renderStoryList(likedStories)}
    </div>
  );
};

export default Profile;
