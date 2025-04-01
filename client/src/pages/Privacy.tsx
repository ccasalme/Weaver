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
          collects, uses, maintains, and discloses information collected from
          users.
        </p>
        <p>
          This site is a prototype project owned and operated by Cyrl Casalme,
          Stella Nabajja, and Corey Parsons for educational and portfolio
          purposes. When you sign up, your data is collected and stored by the
          site owners. Your data will never be sold or shared with third
          parties.
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
        <ul className="cookie-list" style={{ listStyleType: "none" }}>
          <li className="cookie list-item">
            Login cookies last 2 days (or 2 weeks with “Remember Me”).
          </li>
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
      {/* User Data Rights */}
      <div className="section">
        <h2 className="section-title">Your Data & Rights</h2>
        <p>
          If you create an account or leave comments, you may request to receive
          a copy of the personal data we hold about you, or ask us to delete it.
        </p>
        <p>
          This does not include data we are required to keep for security,
          legal, or administrative reasons.
        </p>
      </div>
      {/* Terms and Conditions */}
      <div className="section">
        <h2 className="section-title">Terms and Conditions</h2>
        <p>
          These Terms and Conditions govern your use of this Site. By accessing
          the Site, you confirm that you have read and understand the terms and
          agree to comply with them.
        </p>
        <p>
          This site is a prototype project and is intended for educational and
          portfolio purposes only. Use the site respectfully and lawfully.
        </p>
      </div>
      {/* Intellectual Property */}
      <div className="section">
        <h2 className="section-title">Intellectual Property</h2>
        <p>
          All content on this Site is the property of Cyrl Casalme, Stella
          Nabajja, and Corey Parsons, including text, code, logos, images, and
          anything else related to the platform.
        </p>
      </div>
      {/* Third-Party Services */}
      <div className="section">
        <h2 className="section-title">Third-Party Goods & Services</h2>
        <p>
          Our site may include content or services from third parties. We cannot
          guarantee the quality or accuracy of any external content or
          offerings.
        </p>
      </div>
      {/* Liability Disclaimer */}
      <div className="section">
        <h2 className="section-title">Limitation of Liability</h2>
        <p>
          Cyrl Casalme, Stella Nabajja, and Corey Parsons are not liable for any
          claims, damages, or losses resulting from the use of this Site.
        </p>
      </div>
      {/* Indemnity */}
      <div className="section">
        <h2 className="section-title">Indemnity</h2>
        <p>
          By using this Site, you agree to indemnify and hold harmless the site
          owners and contributors against any claims or losses arising from your
          use of the platform or violation of these terms.
        </p>
      </div>
      {/* Applicable Law */}
      <div className="section">
        <h2 className="section-title">Applicable Law</h2>
        <p>
          These terms are governed by the laws of the Province of Ontario,
          Canada, and the jurisdictions where the creators reside.
        </p>
      </div>
      {/* Severability */}
      <div className="section">
        <h2 className="section-title">Severability</h2>
        <p>
          If any part of these Terms and Conditions is found invalid, that part
          will be removed without affecting the rest of the document.
        </p>
      </div>
      {/* Changes */}
      <div className="section">
        <h2 className="section-title">Changes to This Policy</h2>
        <p>
          These terms and policies may be updated to reflect changes in the
          platform or to remain in compliance with the law. We may post updates
          on the site or notify users via email if necessary.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
