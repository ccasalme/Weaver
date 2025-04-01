import React from "react";
import "./Architects.css"; // You can also Tailwind this if you’d rather

const architects = [
  {
    name: "Cyrl Casalme",
    image: "/images/cyrl.jpg", // adjust path as needed
    github: "https://github.com/casalme",
  },
  {
    name: "Stella Nabajja",
    image: "/images/stella.jpg",
    github: "https://github.com/stellanabajja",
  },
  {
    name: "Corey Parsons",
    image: "/images/corey.jpg",
    github: "https://github.com/yourGitHubUsername",
  },
];

const Architects: React.FC = () => {
  return (
    <div className="architects-page">
      <h1 className="page-title">ABOUT THE ARCHITECTS</h1>

      <div className="architects-content">
        {/* Left Column */}
        <div className="intro-text">
          <p>Who we are</p>
          <p>something...</p>
          <p>something...</p>
          <p>something...</p>
          <p>something...</p>
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
  );
};

export default Architects;
