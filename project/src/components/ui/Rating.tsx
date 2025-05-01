import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  count?: number;
  showCount?: boolean;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ 
  rating, 
  count,
  showCount = true,
  className = ''
}) => {
  // Round to nearest half
  const roundedRating = Math.round(rating * 2) / 2;
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          return (
            <Star
              key={star}
              className={`w-4 h-4 ${
                roundedRating >= star
                  ? 'text-accent-500 fill-accent-500'
                  : roundedRating >= star - 0.5
                  ? 'text-accent-500 fill-accent-500/50'
                  : 'text-gray-300'
              }`}
            />
          );
        })}
      </div>
      
      {showCount && count !== undefined && (
        <span className="ml-1 text-xs text-gray-500">({count})</span>
      )}
    </div>
  );
};

export default Rating;