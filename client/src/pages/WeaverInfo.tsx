import React from "react";

const WeaverInfo: React.FC = () => {
  return (
    <div className="page-container">
      <h1
      style={{
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "#2c3e50",
        display: "inline-block",
        margin: 0,
        textAlign: "center",
        width: "100%",
        fontSize: "2.5em",
        fontWeight: "bold",
        lineHeight: "1.5em",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: "10px",
        textOverflow: "ellipsis",
        overflow: "hidden"
      }}>What is Weaver?</h1>
      <p className="metaphor-intro">
        <em>
          Stories are like trees. Each idea is a seed, planted by one creator.
          As others join in, the story grows — branching into new directions,
          deepening its roots, and stretching toward endless skies.
        </em>
      </p>
      <p>
        <strong>Weaver</strong> is a collaborative short story platform where
        imagination takes the lead. It's designed for creators of all kinds to
        build, share, and evolve stories together — one thread at a time.
      </p>

      <p>
        At its core, Weaver is about community-driven storytelling. Weavers
        (that's you!) can write short story prompts, add to others' stories, or
        explore alternate storylines by branching off with your own creative
        twists.
      </p>

      <p>
        Whether you're continuing someone’s story, posting a unique idea, or
        exploring a "What if?" branch, Weaver helps you connect with other
        storytellers in a fun, flexible, and inspiring environment.
      </p>

      <p>
        We believe storytelling is for everyone — and the best stories are the
        ones we create together. So whether you're here to write, read, or just
        explore, welcome to the world of Weaver.
      </p>

      <p style={{ fontStyle: "italic", marginTop: "1.5rem" }}>
        ✨ Let your imagination lead. Let’s tell stories, together. ✨
      </p>
    </div>
  );
};

export default WeaverInfo;
