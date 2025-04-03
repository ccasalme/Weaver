import React from "react";
import "./Wireframe.css"; // Keep using your main style file

const architects = [
  {
    name: "Cyrl Casalme",
    image: "https://placehold.co/140x140?text=Cyrl",
    github: "https://github.com/casalme",
  },
  {
    name: "Stella Nabajja",
    image: "https://placehold.co/140x140?text=Stella",
    github: "https://github.com/snabaj",
  },
  {
    name: "Corey Parsons",
    image: "https://placehold.co/140x140?text=Corey",
    github: "https://github.com/cpars",
  },
];

const Architects: React.FC = () => {
  return (
    <div className="page-container">
      <div
        className="story-feed"
        style={{ padding: "3rem 2rem", maxWidth: "1000px" }}
      >
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
          💫 About the Architects
        </h1>

        <div
          style={{
            ...textBlockStyle,
            textAlign: "center",
            fontSize: "1.7rem",
            marginBottom: "2.5rem",
          }}
        >
          <p style={{ color: "white"}}>
            Hello, Weavers... 
            <br></br>
            <br></br>
            We’re Cyrl, Stella, and Corey — a team of developers who met
            through a full-stack bootcamp and bonded over a shared love for
            creative coding.
          </p>
          <p style={{ color: "white"}}>
            <h2 style={{ fontSize: "2.7rem", color: "#baffff", textShadow: "0 0 6px #0ff" }}>
              The React Architect
            </h2>
            Cyrl brought everything to life with front-end magic and her love for design.
            <br></br>
            <br></br>
            Everything you see and interact with is the result of her creative touch, chaos, and
            attention to detail.
            <br></br> 
            <br></br>
            She crafted the whole user interface, ensuring that every button, every
            animation, and every interaction is a delightful experience for you.
            <br></br>
            <br></br>
            Cyrl is the one who made sure that the magic is not just a dream, but a reality.
            <br></br>
            <br></br>
            <h2 style={{ fontSize: "2.7rem", color: "#baffff", textShadow: "0 0 6px #0ff" }}>
              The Data Architect
            </h2>
            Stella made sure that the server can handle the magic and that the data flows smoothly.
            <br></br>
            <br></br>
            Without the data, the magic would be lost in the void, and Cyrl would not be able to create this rich world for you. 
            <br></br>
            <br></br>
            With her expertise in backend development, she designed the database
            and server architecture, ensuring that everything runs smoothly behind the scenes.
            <br></br>
            <br></br>
            The Scribe of the Weave―Stella is the one who makes sure that the data is always there, ready to be used by Cyrl and Corey.
            <br></br>
            <br></br>
            <h2 style={{ fontSize: "2.7rem", color: "#baffff", textShadow: "0 0 6px #0ff" }}>
              The Controller Architect
            </h2>
            Corey made sure that everything worked and the Villainous Bugs are squashed! <br></br> <br></br>
            With hundreds and hundreds of codes to make this whole thing possible, 
            a sneaky bug can break the whole magic. 
            <br></br>
            <br></br>
            With Cyrl and Stella teaming up to create the Multiverses for you, Corey made sure that their chaos is controlled.
            <br></br>
            <br></br>
            He is the one who makes sure that things are working as they should, and that nothing breaks this illusion for you. <br></br>
          </p>
          <p style={{ color: "white"}}> 
            Together, we built <strong>Weaver</strong> as a passion project
            that blends storytelling with interactivity.
          </p>
          <p style={{ fontStyle: "italic", color: "#baffff", textShadow: "0 0 6px #0ff" }}>
            Weaver is more than an app — it’s our love letter to imagination,
            collaboration, and the magic of “what if?”
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {architects.map((arch, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "rgba(0,0,0,0.8)",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 0 12px rgba(255,255,255,0.1)",
                textAlign: "center",
                color: "white",
                width: "200px",
              }}
            >
              <img
                src={arch.image}
                alt={arch.name}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              />
              <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem", color: "white" }}>
                {arch.name}
              </h3>
              <a
                href={arch.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#baffff",
                  textDecoration: "underline",
                  fontSize: "1rem",
                }}
              >
                GitHub Profile
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const textBlockStyle: React.CSSProperties = {
  fontSize: "1.6rem",
  color: "#eee",
  backgroundColor: "rgba(0, 0, 0, 0.75)",
  padding: "1.2rem 1.5rem",
  borderRadius: "10px",
  lineHeight: "2.0",
};

export default Architects;
