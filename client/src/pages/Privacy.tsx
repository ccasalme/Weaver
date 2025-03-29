import React from 'react';
import './Privacy.css'; // Ensure this still contains the styling you want
import './Wireframe.css'; // Background image styling
import Wireframe from "../assets/WireFrameBackground.png";

//collapsible component and css not applied yet
const PrivacyPolicy: React.FC = () => {
    return (
        <div className="page-container" style={{ backgroundImage: `url(${Wireframe})` }}>
            <h1 style={{ textAlign: 'center' }}>Privacy Policy and Terms of Use</h1>
            
            <div>
                <h2 style={{color: 'white'}}>Privacy Policy</h2>
                <p>This Privacy Policy governs the manner in which the site collects, uses, maintains, and discloses information collected from users of the site.</p>
            </div>
            <div>
                <h2 style={{color: 'white'}}>Terms and Conditions</h2>
                <p>These terms and conditions govern your use of this site, which is provided by our company. By accessing this site, you indicate your acknowledgment and acceptance of these terms and conditions.</p>
            </div>
            <div>
                <h2 style={{color: 'white'}}>Intellectual Property</h2>
                <p>All content published and made available on our site is the property of our company and the site’s creators.</p>
            </div>
            <div>
                <h2 style={{color: 'white'}}>Third Party Goods and Services</h2>
                <p>Our site may offer goods and services from third parties. We cannot guarantee the quality or accuracy of goods and services made available by third parties on our site.</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
