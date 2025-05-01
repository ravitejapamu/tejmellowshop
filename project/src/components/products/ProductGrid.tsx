import React from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';
import Spinner from '../ui/Spinner';
import ErrorMessage from '../ui/ErrorMessage';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  retryFn?: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  isLoading, 
  error,
  retryFn
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-16">
        <ErrorMessage 
          message="Failed to load products. Please try again later."
          retryFn={retryFn}
        />
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try changing your filters or check back later for new products.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;