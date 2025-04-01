import React from "react";
import "./Architects.css";

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
      <div className="architects-page">
        <h1 className="page-title">ABOUT THE ARCHITECTS</h1>

        <div className="architects-grid">
          <div className="intro-text">
            <h2>Who we are</h2>
            <p>
              Hi! We’re Cyrl, Stella, and Corey — a team of developers who met
              through a full-stack bootcamp and bonded over a shared love for
              creative coding.
            </p>
            <p>
              Cyrl brought clean design and frontend polish, Stella wrangled our
              server and database logic, and Corey made sure the user experience
              felt magical. Together, we built <strong>Weaver</strong> as a
              passion project that blends storytelling with interactivity.
            </p>
            <p>
              Weaver is more than an app — it’s our love letter to imagination,
              collaboration, and the magic of “what if?”
            </p>
          </div>

          <div className="architects-cards">
            {architects.map((arch, index) => (
              <div className="card" key={index}>
                <img src={arch.image} alt={arch.name} className="card-image" />
                <h3 className="card-name">{arch.name}</h3>
                <a href={arch.github} target="_blank" rel="noreferrer">
                  GitHub Link
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architects;
