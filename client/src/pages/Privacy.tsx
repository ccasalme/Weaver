import React from 'react';
import CollapsibleSection from '../components/CollapsibleSection';
import './Privacy.css';

const PrivacyPolicy: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>Privacy Policy and Terms of Use</h1>

            <CollapsibleSection title="Privacy Policy" content={
                <p>This Privacy Policy governs the manner in which the site collects, uses, maintains, and discloses information collected from users of the site.</p>
            }/>

            <CollapsibleSection title="Terms and Conditions" content={
                <p>These terms and conditions govern your use of this site, which is provided by our company. By accessing this site, you indicate your acknowledgment and acceptance of these terms and conditions.</p>
            }/>

            <CollapsibleSection title="Intellectual Property" content={
                <p>All content published and made available on our site is the property of our company and the site’s creators.</p>
            }/>

            <CollapsibleSection title="Third Party Goods and Services" content={
                <p>Our site may offer goods and services from third parties. We cannot guarantee the quality or accuracy of goods and services made available by third parties on our site.</p>
            }/>

            {/* Add more sections as needed */}
        </div>
    );
};

export default PrivacyPolicy;
