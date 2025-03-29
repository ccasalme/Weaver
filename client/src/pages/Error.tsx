import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    return (
        <div className="page-container" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you are looking for has disappeared or never existed.</p>
            <p>
                <Link to="/">Go to the Home Page</Link>
            </p>
        </div>
    );
};

export default ErrorPage;
