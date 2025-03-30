// src/pages/Homepage.tsx
import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import "./Wireframe.css"; // Import the CSS file for styling
import Wireframe from "../assets/WireFrameBackground.png"; // Import the background image
import Login from "../components/Login";
import JoinUs from "../components/JoinUs";

// ✅ Define Comment and Story types properly
interface Comment {
  content: string;
  author: {
    username: string;
  };
}

interface Story {
  _id: string;
  title: string;
  content: string;
  author: {
    username: string;
  };
  likes: number;
  comments: Comment[];
}

// ✅ GraphQL Queries & Mutations
const GET_STORIES = gql`
  query GetStories {
    stories {
      _id
      title
      content
      author {
        username
      }
      likes
      comments {
        content
        author {
          username
        }
      }
    }
  }
`;

const ADD_STORY = gql`
  mutation AddStory($title: String!, $content: String!) {
    addStory(title: $title, content: $content) {
      _id
      title
      content
    }
  }
`;

const Homepage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showJoinUs, setShowJoinUs] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // ✅ Properly typed useQuery
  const { loading, error, data, refetch } = useQuery<{ stories: Story[] }>(
    GET_STORIES
  );

  // ✅ Properly typed useMutation
  const [addStory] = useMutation<{ addStory: Story }>(ADD_STORY, {
    onCompleted: () => {
      refetch(); // Refresh stories after posting
      setTitle("");
      setContent("");
    },
  });

  // ✅ Simulated login check
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // ✅ Handle Story Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addStory({ variables: { title, content } });
      alert("Story posted successfully! 🎉");
    } catch (error) {
      console.error("Error posting story:", error);
    }
  };

  return (
    <div
      className="page-container"
      style={{ backgroundImage: `url(${Wireframe})` }}
    >
      <h1>Home Page</h1>

      {/* ✅ Always Render Feed Container with Conditional Content */}
      <div className="feed-container">
        {!isAuthenticated ? (
          <div className="auth-container">
            <p>Welcome! Please log in or join us to participate.</p>
            <button onClick={() => setShowLogin(true)}>Log In</button>
            <button onClick={() => setShowJoinUs(true)}>Join Us</button>
          </div>
        ) : (
          <>
            <h2>Start a New Story</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Story Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Write your story..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <button type="submit">Post Story</button>
            </form>
          </>
        )}
      </div>

      {/* ✅ Show Recent Stories */}
      <h2>Recent Stories</h2>
      {loading ? (
        <p>Loading stories...</p>
      ) : error ? (
        <p>Error fetching stories!</p>
      ) : (
        <div className="story-feed">
          {data?.stories.map((story: Story) => (
            <div key={story._id} className="story-card">
              <h3>{story.title}</h3>
              <p>{story.content}</p>
              <p>By: {story.author.username}</p>
              <p>❤️ {story.likes}</p>
              <h4>Comments:</h4>
              {story.comments.map((comment: Comment, index: number) => (
                <p key={index}>
                  {comment.content} -{" "}
                  <strong>{comment.author.username}</strong>
                </p>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ✅ Render modals for Login and JoinUs */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          switchToJoinUs={() => {
            setShowLogin(false);
            setShowJoinUs(true);
          }}
        />
      )}
      {showJoinUs && (
        <JoinUs
          onClose={() => setShowJoinUs(false)}
          switchToLogin={() => {
            setShowJoinUs(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
};

export default Homepage;
