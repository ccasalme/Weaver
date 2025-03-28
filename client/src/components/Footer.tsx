
import './Footer.css'; // Assuming you will create a separate CSS file for styling

const Footer = () => {
    return (
        <footer className="footer" style={{
            position: 'fixed', // Fixes the footer at the bottom of the viewport
            left: '0',
            bottom: '0',
            width: '100%',
            textAlign: 'center',
            boxSizing: 'border-box',
            padding: '1rem',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            background: 'linear-gradient(18deg, rgba(60,64,66,0.9976905311778291) 2%, rgba(96,99,102,1) 14%, rgba(55,59,59,1) 86%)',
            zIndex: 1000 // Ensure the footer is above other content
        }}
        >
            <p style={{
                color: 'white',
                fontSize: '1rem',
                fontFamily: 'Arial, sans-serif',
                margin: '0',
                padding: '1rem',
                textAlign: 'center',
                textDecoration: 'none',
                letterSpacing: '0.05rem',
                fontWeight: 'bold',
                lineHeight: '1.5'
                }}>© 2025 Weaver | Cyrl Casalme, Stella Nabajja, Corey Parsons | All rights reserved.</p>
        </footer>
    );
}

export default Footer;
