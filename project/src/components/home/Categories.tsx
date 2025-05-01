import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'mens-clothing',
    name: "Men's Clothing",
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    slug: "men's clothing"
  },
  {
    id: 'womens-clothing',
    name: "Women's Clothing",
    image: "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    slug: "women's clothing"
  },
  {
    id: 'jewelery',
    name: "Jewelry",
    image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    slug: "jewelery"
  },
  {
    id: 'electronics',
    name: "Electronics",
    image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    slug: "electronics"
  }
];

const Categories: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/products?category=${encodeURIComponent(category.slug)}`}
              className="group block"
            >
              <div className="relative rounded-lg overflow-hidden aspect-square">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-colors">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;