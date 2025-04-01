// src/pages/Homepage.tsx
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import "./Wireframe.css"; // Import the CSS for styling
import Login from "../components/Login";
import JoinUs from "../components/JoinUs";
import HeroBanner from "../assets/weaverBanner.png"; // ✅ Import HeroBanner
import SecondBanner from "../assets/weaverBanner2.png"; // ✅ Import HeroBanner2
import { GET_STORIES } from "../graphql/queries"; // ✅ Import GraphQL query

// ✅ Define Story Interface to match GraphQL response
interface Story {
  _id: string;
  title: string;
  content: string;
  author: {
    username: string;
  };
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

  // ✅ Fetch stories from GraphQL
  const { loading, error, data } = useQuery<{ getStories: Story[] }>(GET_STORIES);

  if (loading) return <p>Loading stories...</p>;
  if (error) return <p>Error loading stories: {error.message}</p>;

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
          <h2
            style={{
              color: "white",
              textAlign: "center",
              background:
                "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Welcome to Weaver!
          </h2>
          <p style={{ color: "white", textAlign: "center" }}>
            Join us to explore, create, and engage with stories.
          </p>

          {/* ✅ Login Button */}
          <button
            onClick={() => setShowLogin(true)}
            className="login-btn"
            style={{
              background:
                "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          {/* ✅ Join Us Button */}
          <button
            onClick={() => setShowJoinUs(true)}
            className="join-btn"
            style={{
              background:
                "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Join Us
          </button>
        </div>
      )}

      {/* ✅ Stories Section (Visible to ALL Users) */}
      <div
        className="story-feed"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
          height: "auto",
          margin: "10px",
          marginBottom: "50px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          paddingBottom: "50px",
        }}
      >
        <h2
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            background:
              "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Recent Stories
        </h2>
        {data?.getStories && data.getStories.length > 0 ? (
          data.getStories.map((story: Story) => (
            <div
              key={story._id}
              className="story-card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "700px",
                margin: "10px",
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
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
