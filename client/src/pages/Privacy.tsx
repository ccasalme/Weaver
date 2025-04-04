import React from "react";
import "./Wireframe.css";
import Wireframe from "../assets/WireFrameBackground.png";
import CollapsibleSection from "../components/CollapsibleSection";

const PrivacyPolicy: React.FC = () => {
  return (
    <div
      className="page-container"
      style={{
        backgroundImage: `url(${Wireframe})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="story-feed" style={{ padding: "3rem 2rem", maxWidth: "1000px" }}>
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
          🔐 Privacy Policy & Terms of Use
        </h1>

        <p style={introStyle}>
          We take your privacy seriously. These terms guide how we handle your data and your experience on Weaver.
        </p>

        <div style={textBlockStyle}>
          {sections.map(({ title, content }, i) => (
            <CollapsibleSection key={i} title={title} content={<div style={{ color: "white" }}>{content}</div>} />
          ))}
        </div>

        <p
          style={{
            fontSize: "1.5rem",
            color: "#baffff",
            textAlign: "center",
            fontStyle: "italic",
            marginTop: "3rem",
            textShadow: "0 0 8px black",
          }}
        >
          ✨ By weaving with us, you agree to protect the story space. ✨
        </p>
      </div>
    </div>
  );
};

const introStyle: React.CSSProperties = {
  fontSize: "1.6rem",
  color: "#ffffff",
  backgroundColor: "rgba(0, 0, 0, 0.85)",
  padding: "1rem 1.5rem",
  borderRadius: "10px",
  textAlign: "center",
  marginBottom: "2.5rem",
  lineHeight: "1.8",
};

const textBlockStyle: React.CSSProperties = {
  fontSize: "1.4rem",
  color: "#ffffff",
  backgroundColor: "rgba(0, 0, 0, 0.75)",
  padding: "1.5rem",
  borderRadius: "12px",
  marginBottom: "2rem",
  lineHeight: "2.0",
};

const sections = [
  {
    title: "Privacy Policy",
    content: (
      <>
        <p style={{ color: "black"}}>
          This Privacy Policy governs the manner in which Weaver and the developers collect, use, maintain, and disclose information collected from users.
        </p>
        <p style={{ color: "black"}}>
          This site is a prototype project owned and operated by Cyrl Casalme, Stella Nabajja, and Corey Parsons for educational and portfolio purposes only. Your data is never sold. 
          <br></br>
          <br></br>
          <strong>Weaver is a prototype and not a commercial product.</strong>
          <br></br>
          <br></br>
          However, since this is a prototype, <strong>we cannot guarantee the security of your data.</strong>
          <br></br>
          <br></br>
          <strong>Weaver is not fully a secure site yet.</strong>
          <br></br>
          <br></br>
          We strongly advise against using your real name, email, or any sensitive information on this site.
          <br></br>
          <br></br>
          <strong>Weaver is not responsible for any data breaches or leaks.</strong>
          <br></br>
          <br></br>
          <strong>Use at your own risk.</strong> 
        </p>
        <p style={{ color: "black"}}>
          Note that we may collect metadata like your IP address and browser type for analytics and spam protection.
        </p>
      </>
    ),
  },
  {
    title: "Cookies",
    content: (
      <>
        <ul style={{ paddingLeft: "1rem" }}>
          <p style={{ color: "black"}}><strong>We use cookies to improve your experience:</strong></p>
          <li style={{ color: "black", listStyle: "none"}}> 🕸️ Login cookies may last indefinitely.</li>
          <li style={{ color: "black", listStyle: "none"}}> 🕸️ Screen preference cookies last 1 year.</li>
          <li style={{ color: "black", listStyle: "none"}}> 🕸️ Post/comment cookies may store content metadata for convenience.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Embedded Content",
    content: (
      <p style={{ color: "black"}}>
        Some stories may embed videos or tweets. These behave like visiting the source site and may collect data independently.
      </p>
    ),
  },
  {
    title: "Your Data & Rights",
    content: (
      <>
        <p style={{ color: "black"}}>
          You may request a copy or deletion of your stored data. Exceptions apply where legal or security reasons require retention.
        </p>
      </>
    ),
  },
  {
    title: "Terms and Conditions",
    content: (
      <>
        <p style={{ color: "black"}}>
          By using Weaver, you agree to use the site lawfully and respectfully. This project is a prototype and not intended for commercial use.
        </p>
      </>
    ),
  },
  {
    title: "Intellectual Property",
    content: (
      <p style={{ color: "black"}}>
        All content is property of the creators — Cyrl Casalme, Stella Nabajja, and Corey Parsons — unless otherwise credited.
      </p>
    ),
  },
  {
    title: "Third-Party Goods & Services",
    content: (
      <p style={{ color: "black"}}>
        We cannot guarantee external services embedded in Weaver. Interact with third-party content at your own discretion.
      </p>
    ),
  },
  {
    title: "Limitation of Liability",
    content: (
      <p style={{ color: "black"}}>
        The creators are not liable for damages, losses, or interruptions resulting from the use of Weaver.
      </p>
    ),
  },
  {
    title: "Indemnity",
    content: (
      <p style={{ color: "black"}}>
        By using this Site, you agree to indemnify the site owners and contributors against any claims or losses arising from your use of the platform or violation of these terms.
      </p>
    ),
  },
  {
    title: "Applicable Law",
    content: (
      <p style={{ color: "black"}}>
        These terms are governed by the laws of the Province of Ontario, Canada, and the jurisdictions where the creators reside.
      </p>
    ),
  },
  {
    title: "Severability",
    content: (
      <p style={{ color: "black"}}>
        If any part of these Terms and Conditions is found invalid, that part will be removed without affecting the rest of the document.
      </p>
    ),
  },
  {
    title: "Changes to This Policy",
    content: (
      <p style={{ color: "black"}}>
        These policies may change. Significant updates will be posted on the site or sent via email when necessary.
      </p>
    ),
  },
];

export default PrivacyPolicy;
