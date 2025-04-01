// src/components/StoryFeed.tsx
import React from "react";
import "../pages/Wireframe.css"; // ✅ Import the CSS for story styles

// ✅ Define Story Interface
interface Story {
  _id: string;
  title: string;
  content: string;
  author: {
    username: string;
  };
}

interface StoryFeedProps {
  stories: Story[];
}

const StoryFeed: React.FC<StoryFeedProps> = ({ stories }) => {
  return (
    <div className="story-feed">
      <h2 className="story-feed-title">Recent Stories</h2>

      {stories.length > 0 ? (
        stories.map((story) => (
          <div key={story._id} className="story-card">
            <h3>{story.title}</h3>
            <p>{story.content}</p>
            <p className="story-author">
              <strong>By:</strong> {story.author.username}
            </p>
          </div>
        ))
      ) : (
        <p className="no-stories">No stories available at the moment.</p>
      )}
    </div>
  );
};

export default StoryFeed;
