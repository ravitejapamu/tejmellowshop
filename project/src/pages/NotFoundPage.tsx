import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Page Not Found | Mellow';
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        We're sorry, the page you requested could not be found. Please go back to the homepage.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          Back to Homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;