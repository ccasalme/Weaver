// src/pages/Homepage.tsx
import React, { useState, useEffect } from "react";
import "./Wireframe.css"; // Import the CSS for styling
import Login from "../components/Login";
import JoinUs from "../components/JoinUs";
import HeroBanner from "../assets/weaverBanner.png"; // ✅ Import HeroBanner
import SecondBanner from "../assets/weaverBanner2.png"; // ✅ Import HeroBanner2
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
      {/* ✅ Hero Banner Section */}
      <div className="banner-container">
        <img src={HeroBanner} alt="Weaver Banner" className="hero-banner" />
        <img src={SecondBanner} alt="Weaver Banner 2" className="hero-banner-2" />
      </div>


      {/* ✅ Show login and join us buttons only if NOT logged in */}
      {!isAuthenticated && (
        <div className="auth-container">
          <h2>Welcome to Weaver!</h2>
          <p>Join us to explore, create, and engage with stories.</p>

          {/* ✅ Login Button */}
          <button
            onClick={() => setShowLogin(true)}
            className="login-btn"
          >
            Login
          </button>

          {/* ✅ Join Us Button */}
          <button
            onClick={() => setShowJoinUs(true)}
            className="join-btn"
          >
            Join Us
          </button>
        </div>
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
