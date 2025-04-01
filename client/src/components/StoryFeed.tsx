// src/components/StoryFeed.tsx
import React, { useState, useEffect } from "react";

// ✅ Define Story Interface
interface Story {
  _id: string;
  title: string;
  content: string;
  author: {
    username: string;
  };
}

// ✅ StoryFeed Component
const StoryFeed: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch stories using GraphQL query
  const fetchStories = async (): Promise<Story[]> => {
    try {
      const response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              getStories {
                _id
                title
                content
                author {
                  username
                }
              }
            }
          `,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch stories");
      }

      const data = await response.json();
      return data.data.getStories as Story[]; // ✅ Cast to Story[]
    } catch (err: unknown) {
      // ✅ Log error to console (so ESLint knows it's handled)
      console.error("Error fetching stories:", err);
      throw err;
    }
  };

  // ✅ Fetch stories on component mount
  useEffect(() => {
    const loadStories = async () => {
      try {
        const storyData = await fetchStories();
        setStories(storyData);
      } catch (err) {
        setError("Error fetching stories. Please try again later.");
        console.error("Caught Error:", err); // ✅ Log caught error
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, []);

  // ✅ Loading state
  if (loading) {
    return <p className="story-feed">Loading stories...</p>;
  }

  // ✅ Error state
  if (error) {
    return <p className="error">{error}</p>;
  }

  // ✅ Render stories
  return (
    <div className="story-feed">
      <h2>Recent Stories</h2>

      {stories.length > 0 ? (
        stories.map((story: Story) => (
          <div key={story._id} className="story-card">
            <h3>{story.title}</h3>
            <p>{story.content}</p>
            <p>
              <strong>By:</strong> {story.author.username}
            </p>
          </div>
        ))
      ) : (
        <p>No stories available at the moment.</p>
      )}
    </div>
  );
};

export default StoryFeed;
