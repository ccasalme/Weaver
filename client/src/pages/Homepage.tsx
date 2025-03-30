// src/pages/Homepage.tsx
import React, { useState, useEffect } from "react";
import "./Wireframe.css"; // Import the CSS for styling
import Login from "../components/Login";
import JoinUs from "../components/JoinUs";
import dummyStories from "../data/dummyStories.json"; // ✅ Import dummy stories

// ✅ Define Story Interface
interface Story {
  id: number;
  title: string;
  content: string;
  author: string;
}

const Homepage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showJoinUs, setShowJoinUs] = useState<boolean>(false);

  // ✅ Simulated login check
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token found:", !!token);
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="page-container">
      {/* ✅ Show login and join us buttons if NOT logged in */}
      {!isAuthenticated ? (
        <>
          {/* Auth Container for Login/Join Us */}
          <div className="auth-container">
            <h2>Welcome to Weaver!</h2>
            <p>Join us to explore, create, and engage with stories.</p>

            {/* ✅ Login Button */}
            <button
              onClick={() => {
                console.log("✅ Login button clicked!");
                setShowLogin(true);
              }}
              className="login-btn"
            >
              Login
            </button>

            {/* ✅ Join Us Button */}
            <button
              onClick={() => {
                console.log("✅ Join Us button clicked!");
                setShowJoinUs(true);
              }}
              className="join-btn"
            >
              Join Us
            </button>
          </div>

          {/* Main Content for Non-Logged-In Users */}
          <div className="main-content">
            <h2>Explore Stories</h2>
            <p>
              Sign up or log in to explore, create, and engage with the Weaver
              community!
            </p>
          </div>
        </>
      ) : (
        <>
          {/* ✅ Show feed if logged in */}
          <div className="feed-container">
            <h1>Welcome Back!</h1>
            <p>Explore, write, and engage with your favorite stories.</p>
          </div>
        </>
      )}

      {/* ✅ Stories Section (Visible to ALL Users) */}
      <div className="story-feed">
        <h2>Recent Stories</h2>
        {dummyStories.length > 0 ? (
          dummyStories.map((story: Story) => (
            <div key={story.id} className="story-card">
              <h3>{story.title}</h3>
              <p>{story.content}</p>
              <p>
                <strong>By:</strong> {story.author}
              </p>
            </div>
          ))
        ) : (
          <p>No stories available at the moment.</p>
        )}
      </div>

      {/* ✅ Render modals for Login and JoinUs */}
      {showLogin && (
        <Login
          onClose={() => {
            console.log("❎ Closing Login Modal");
            setShowLogin(false);
          }}
          switchToJoinUs={() => {
            console.log("🔄 Switching to Join Us Modal");
            setShowLogin(false);
            setShowJoinUs(true);
          }}
        />
      )}

      {showJoinUs && (
        <JoinUs
          onClose={() => {
            console.log("❎ Closing Join Us Modal");
            setShowJoinUs(false);
          }}
          switchToLogin={() => {
            console.log("🔄 Switching to Login Modal");
            setShowJoinUs(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
};

export default Homepage;
