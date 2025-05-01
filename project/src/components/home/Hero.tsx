import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="Fashion model"
          className="w-full h-full object-cover object-center opacity-60"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Summer Collection 2025
          </h1>
          <p className="mt-4 text-xl text-gray-200">
            Discover our new summer collection and elevate your style with the latest trends.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/products">
              <Button size="lg">
                Shop Now
              </Button>
            </Link>
            <Link to="/products?category=women's clothing">
              <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                Women's Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;