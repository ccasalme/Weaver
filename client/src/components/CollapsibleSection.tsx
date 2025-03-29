import React, { useState } from 'react';

interface CollapsibleSectionProps {
    title: string;
    content: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
    title = 'Default Title', // Default title if none is provided
    content = <p>Default content if none is provided.</p> // Default ReactNode if none is provided
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = () => {
        console.log(`Toggling section. Current state: ${isOpen}`);
        setIsOpen(!isOpen);
        console.log(`New state after toggle: ${isOpen}`);
    };

    console.log(`Rendering CollapsibleSection with title: ${title}`);

    return (
        <div>
            <h2 onClick={toggleOpen}
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
