import React, { useState } from 'react';

// Component for each section with dropdown functionality
const CollapsibleSection: React.FC<{ title: string, content: React.ReactNode }> = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false); // State to manage dropdown open/close

    return (
        <div>
            <h2 onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', textAlign: 'center', padding: '1.5rem', backgroundColor: '#f0f0f0', borderRadius: '8px', margin: '1rem 0' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}>
                {isOpen ? '🔽' : '▶️'} {title}
            </h2>
            {isOpen && <div>{content}</div>}
        </div>
    );
};

export default CollapsibleSection;
