import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "../graphql/queries";
import "./Wireframe.css"; // Import the CSS for styling

const Profile: React.FC = () => {
  const { loading, error, data } = useQuery(GET_MY_PROFILE);
  const [expandedStoryIds, setExpandedStoryIds] = useState<string[]>([]);

  if (loading) return <p>Loading profile...</p>;
  if (error || !data || !data.myProfile) return <p>Error loading profile!</p>;

  const {
    bio,
    avatar,
    followers,
    sharedStories = [],
    likedStories = [],
  } = data.myProfile;

  const toggleExpand = (storyId: string) => {
    setExpandedStoryIds((prev) =>
      prev.includes(storyId)
        ? prev.filter((id) => id !== storyId)
        : [...prev, storyId]
    );
  };

  return (
    <div className="profile-container">
      <img src={avatar} alt="Profile Avatar" className="profile-avatar" />
      <h2>My Profile</h2>
      <p>{bio}</p>

      <h3>Followers: {followers.length}</h3>

      <h3>My Stories and Branches:</h3>
      {sharedStories.length === 0 ? (
        <p>You haven't created any stories yet!</p>
      ) : (
        sharedStories.map((story: any) => (
          <div key={story._id} className="story-card">
            <h4>{story.title}</h4>
            <p><strong>Story ID:</strong> {story._id}</p>
            {story.comments && story.comments.length > 0 && (
              <>
                {!expandedStoryIds.includes(story._id) ? (
                  <button onClick={() => toggleExpand(story._id)} className="comment-btn">
                    🧵 See all threads
                  </button>
                ) : (
                  <>
                    <div className="comments-section">
                      {story.comments.map((comment: any) => (
                        <div key={comment._id} className="comment-card">
                          <p><strong>{comment.author.username}:</strong> {comment.content}</p>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => toggleExpand(story._id)} className="comment-btn">
                      🔽 Collapse threads
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        ))
      )}

      <h3>Stories I Liked:</h3>
      <ul>
        {likedStories.map((story: { _id: string; title: string }) => (
          <li key={story._id}>{story.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;