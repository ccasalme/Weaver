import React from "react";
import "./Wireframe.css";

const WeaverInfo: React.FC = () => {
  return (
    <div className="page-container">
      <div className="story-feed" style={{ padding: "3rem 2rem", maxWidth: "900px" }}>
        <h1
          style={{
            color: "white",
            background: "linear-gradient(to right, #3e5151, #decba4)",
            padding: "1rem 2rem",
            borderRadius: "12px",
            textAlign: "center",
            fontSize: "3rem", // bumped up from 2.8rem
            fontWeight: "bold",
            textTransform: "uppercase",
            textShadow: "1px 1px 5px black",
            letterSpacing: "0.1em",
            marginBottom: "2.5rem",
            boxShadow: "0 0 20px rgba(255,255,255,0.2)",
          }}
        >
          🌌 What is Weaver?
        </h1>

        <p style={introStyle}>
          <em>
            Stories are like trees. 
            
            <br></br>
            <br></br>

            Each idea is a seed, planted by one creator.

            <br></br>
            <br></br>

            As others join in, the story grows — branching into new directions,
            deepening its roots, and stretching toward endless skies.
          </em>
        </p>

        <p style={textBlockStyle}>
          <strong>Weaver</strong> is a collaborative short story platform where imagination takes the lead.
          
          <br></br>
          <br></br>

          It's designed for creators of all kinds to build, share, and evolve stories together — one thread at a time.
     
          <br></br>
          <br></br>
          
          At its core, Weaver is about community-driven storytelling. Weavers (that's you!)
          can write short story prompts, add to others' stories, or explore alternate storylines by branching off
          with your own creative twists.

          <br></br>
          <br></br>

          Whether you're continuing someone’s story, posting a unique idea, or exploring a "What if?" branch,
          Weaver helps you connect with other storytellers in a fun, flexible, and inspiring environment.
          
          <br></br>
          <br></br>
          We believe storytelling is for everyone — and the best stories are the ones we create together.
          So whether you're here to write, read, or just explore, welcome to the world of Weaver.
        </p>

        <p
          style={{
            ...textBlockStyle,
            fontStyle: "italic",
            color: "#baffff",
            textAlign: "center",
            fontSize: "1.5rem",
            textShadow: "0 0 6px #0ff",
          }}
        >
          ✨ Let your imagination lead. Let’s tell stories, together. ✨
        </p>
      </div>
    </div>
  );
};

const introStyle: React.CSSProperties = {
  fontSize: "1.9rem", // was 1.4rem
  color: "#f0f0f0",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  padding: "1.2rem 1.5rem",
  borderRadius: "10px",
  textAlign: "center",
  marginBottom: "2rem",
  lineHeight: "1.8",
};

const textBlockStyle: React.CSSProperties = {
  fontSize: "1.8rem", // was 1.2rem
  color: "#eee",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  padding: "1.2rem 1.5rem",
  borderRadius: "10px",
  marginBottom: "2rem",
  lineHeight: "2.0",
};

export default WeaverInfo;
