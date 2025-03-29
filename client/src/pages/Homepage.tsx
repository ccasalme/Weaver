
import './Wireframe.css'; // Import the CSS file for styling
import Wireframe from "../assets/WireFrameBackground.png"; // Import the background image

const Homepage = () => {
    return (
        <div className="page-container" style={{ backgroundImage: `url(${Wireframe})` }}>
            <h1>Home Page</h1>
            <p>Welcome to the Home Page. This is where you can start your journey on our site.</p>
        </div>
    );
}

export default Homepage;

