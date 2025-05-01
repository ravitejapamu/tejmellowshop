import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  retryFn?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  retryFn,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-4 text-center ${className}`}>
      <AlertTriangle className="w-12 h-12 text-red-500 mb-2" />
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Oops! Something went wrong</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      
      {retryFn && (
        <button
          onClick={retryFn}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;