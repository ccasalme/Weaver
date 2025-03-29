// CollapsibleSection.tsx
// makes things collapsible
import React, { useState } from 'react';

interface CollapsibleSectionProps {
    title: string;
    content: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div>
            <h2 onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={(e: React.MouseEvent<HTMLHeadingElement>) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
                onMouseLeave={(e: React.MouseEvent<HTMLHeadingElement>) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
            >
                {isOpen ? '🔽' : '▶️'} {title}
            </h2>
            {isOpen && (
                <div>
                    {content}
                </div>
            )}
        </div>
    );
};

export default CollapsibleSection;
