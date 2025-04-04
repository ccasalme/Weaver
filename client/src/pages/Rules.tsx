// src/pages/Rules.tsx
import React from "react";
import "./Wireframe.css";

const Rules: React.FC = () => {
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
            fontSize: "3rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            textShadow: "1px 1px 5px black",
            letterSpacing: "0.1em",
            marginBottom: "2.5rem",
            boxShadow: "0 0 20px rgba(255,255,255,0.2)",
          }}
        >
          🛡️ Rules & Guidelines
        </h1>

        <p style={introStyle}>
          Welcome to <strong>Weaver</strong> — a space where creativity thrives and stories grow together.
          To keep our platform safe, respectful, and inspiring, we ask all Weavers to follow these rules and guidelines.
        </p>

        {rules.map(({ title, description }, idx) => (
          <section key={idx} style={ruleStyle}>
            <h2 style={subheadingStyle}>{title}</h2>
            <p style={textBlockStyle}>{description}</p>
          </section>
        ))}

        <p
          style={{
            ...textBlockStyle,
            fontStyle: "italic",
            color: "#ffd",
            textAlign: "center",
            fontSize: "1.5rem",
            textShadow: "0 0 4px #f3e5ab",
          }}
        >
          💬 Questions? Concerns? Ideas to improve these rules? Reach out to our team — we’re listening.
        </p>
      </div>
    </div>
  );
};

const rules = [
  {
    title: "1. Be Kind and Respectful",
    description:
      "Treat all Weavers with respect. Hate speech, harassment, bullying, or targeted attacks of any kind will not be tolerated. We’re here to create, not tear each other down.",
  },
  {
    title: "2. Keep Content Appropriate",
    description:
      "Do not post explicit, graphic, or NSFW content. Weaver is a storytelling app for a wide audience — keep it friendly, fun, and creative for all users.",
  },
  {
    title: "3. Respect Creative Ownership",
    description:
      "You are responsible for what you write. Don’t copy or repost someone else’s work from outside Weaver without permission. Within the app, collaboration is encouraged — but don’t claim others’ ideas as your own.",
  },
  {
    title: "4. No Spam or Disruptive Behavior",
    description:
      "Avoid flooding threads, abusing branching, or posting irrelevant content. Help keep story spaces meaningful and enjoyable to read.",
  },
  {
    title: "5. Choose Branches Wisely",
    description:
      "When you branch a story, you’re creating a new timeline. Respect the original tone, characters, and intent — or clearly take it in a new, creative direction. Don’t use branches to troll or derail the work of others.",
  },
  {
    title: "6. Use the Report System if Needed",
    description:
      "If you see content that violates these rules or feels unsafe, use the report feature. Our team (and our Architects) will review flagged content to keep the community safe.",
  },
  {
    title: "7. Weavers Who Break the Rules",
    description:
      "Repeated or serious rule violations may result in warnings, content removal, or account suspension. We want everyone to have a good experience here — please help make Weaver a welcoming space.",
  },
];

const introStyle: React.CSSProperties = {
  fontSize: "1.9rem",
  color: "#f0f0f0",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  padding: "1.2rem 1.5rem",
  borderRadius: "10px",
  textAlign: "center",
  marginBottom: "2rem",
  lineHeight: "1.8",
};

const textBlockStyle: React.CSSProperties = {
  fontSize: "1.7rem",
  color: "#eee",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  padding: "1.2rem 1.5rem",
  borderRadius: "10px",
  marginBottom: "2rem",
  lineHeight: "2.0",
};

const ruleStyle: React.CSSProperties = {
  marginBottom: "2rem",
};

const subheadingStyle: React.CSSProperties = {
  color: "#fff",
  fontSize: "2rem",
  marginBottom: "1rem",
  textShadow: "0 0 4px rgba(255,255,255,0.3)",
  background: "rgba(0, 0, 0, 0.9)",
  padding: "0.6rem 1rem",
  borderRadius: "8px",
};

export default Rules;
