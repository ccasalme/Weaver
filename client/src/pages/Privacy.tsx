import React from "react";
import "./Privacy.css"; // Ensure this still contains the styling you want
import "./Wireframe.css"; // Background image styling
import Wireframe from "../assets/WireFrameBackground.png";

//collapsible component and css not applied yet
const PrivacyPolicy: React.FC = () => {
  return (
    <div
      className="page-container"
      style={{ backgroundImage: `url(${Wireframe})` }}
    >
      <h1 style={{ textAlign: "center" }}>Privacy Policy and Terms of Use</h1>

      {/* Privacy Policy */}
      <div className="section">
        <h2 className="section-title">Privacy Policy</h2>
        <p>
          This Privacy Policy governs the manner in which stealmynoteshere.com
          (the “Site”) collects, uses, maintains, and discloses information
          collected from users. This site is a prototype project owned and
          operated by Cyrl Casalme, Stella Nabajja, and Corey Parsons for
          educational and portfolio purposes.
        </p>
        <p>
          When you sign up, your data (like name and email) is collected and
          stored by the site owners. Your data will never be sold or shared with
          third parties.
        </p>
        <p>
          We may collect metadata such as IP address, browser agent, referrer,
          and more to improve the platform and for analytics or spam protection.
        </p>
      </div>
      {/* Cookies */}
      <div className="section">
        <h2 className="section-title">Cookies</h2>
        <p>
          Cookies are used to enhance your experience. For example, login
          cookies, screen preference cookies, and comment data may be stored.
        </p>
        <ul>
          <li>Login cookies last 2 days (or 2 weeks with “Remember Me”).</li>
          <li>Screen option cookies last 1 year.</li>
          <li>
            Comment and post cookies may store content metadata for convenience.
          </li>
        </ul>
      </div>
      {/* Embedded Content */}
      <div className="section">
        <h2 className="section-title">Embedded Content</h2>
        <p>
          Articles on this site may include embedded media from other websites.
          Interacting with embedded content (like YouTube videos or Tweets)
          behaves exactly like visiting those external sites.
        </p>
      </div>
      <div className="section">
        <h2 className="section-title" style={{ color: "white" }}>
          Terms and Conditions
        </h2>
        <p>
          These terms and conditions govern your use of this site, which is
          provided by our company. By accessing this site, you indicate your
          acknowledgment and acceptance of these terms and conditions.
        </p>
      </div>
      <div className="section">
        <h2 className="section-title" style={{ color: "white" }}>
          Intellectual Property
        </h2>
        <p>
          All content published and made available on our site is the property
          of our company and the site’s creators.
        </p>
      </div>
      <div className="section">
        <h2 className="section-title" style={{ color: "white" }}>
          Third Party Goods and Services
        </h2>
        <p>
          Our site may offer goods and services from third parties. We cannot
          guarantee the quality or accuracy of goods and services made available
          by third parties on our site.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
