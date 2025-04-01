import React from "react";
import "./Architects.css";

const architects = [
  {
    name: "Cyrl Casalme",
    image: "/images/cyrl.jpg", // adjust path as needed
    github: "https://github.com/ccasalme",
  },
  {
    name: "Stella Nabajja",
    image: "/images/stella.jpg",
    github: "https://github.com/snabaj",
  },
  {
    name: "Corey Parsons",
    image: "/images/corey.jpg",
    github: "https://github.com/cpars",
  },
];

const Architects: React.FC = () => {
  return (
    <div className="page-container">
      <div className="architects-page">
        <h1 className="page-title">ABOUT THE ARCHITECTS</h1>

        <div className="architects-content">
          {/* Left Column */}
          <div className="intro-text">
            <p>Who we are</p>
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

          {/* Divider */}
          <div className="vertical-line"></div>

          {/* Right Column - Cards */}
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
