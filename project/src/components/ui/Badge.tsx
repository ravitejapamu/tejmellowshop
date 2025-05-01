import React from 'react';

interface BadgeProps {
  count: number;
  maxCount?: number;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  count, 
  maxCount = 99, 
  className = ''
}) => {
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
  
  if (count === 0) {
    return null;
  }
  
  return (
    <span className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-medium bg-accent-500 text-white ${className}`}>
      {displayCount}
    </span>
  );
};

export default Badge;