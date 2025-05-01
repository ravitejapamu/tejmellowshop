import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import Rating from '../ui/Rating';
import Button from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
  };
  
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative pt-[100%] bg-gray-100">
          <img 
            src={product.image} 
            alt={product.title} 
            className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 min-h-[2.5rem] mb-1 hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <Rating rating={product.rating.rate} count={product.rating.count} />
        </div>
        
        <Button 
          variant="primary" 
          size="sm" 
          fullWidth
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;