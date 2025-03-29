import './Wireframe.css'; // Import the CSS file for styling
import Wireframe from "../assets/WireFrameBackground.png"; // Import the background image

const Architects = () => {
    return (
        <div className="page-container" style={{ backgroundImage: `url(${Wireframe})` }}>
            <h1>Architects</h1>
            <p>This page is dedicated to the architects of our community.</p>
        </div>
    );
}

export default Architects;
