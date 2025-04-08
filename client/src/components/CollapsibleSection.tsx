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
            <div style={{ background: "linear-gradient(to right, #3e5151, #decba4)" }}>
            <h2
                onClick={toggleOpen}
            >
                {isOpen ? '🔽' : '▶️'} {title}
            </h2>
            {isOpen && (
                <div>
                    {content}
                </div>
            )}
            </div>
        </div>
    );
};

export default CollapsibleSection;
