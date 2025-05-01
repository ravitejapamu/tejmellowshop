import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { getFeaturedProducts } from '../../services/api';
import ProductGrid from '../products/ProductGrid';

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const featuredProducts = await getFeaturedProducts();
        setProducts(featuredProducts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load products'));
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  const handleRetry = () => {
    setProducts([]);
    setIsLoading(true);
    setError(null);
    
    getFeaturedProducts()
      .then((featuredProducts) => {
        setProducts(featuredProducts);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error('Failed to load products'));
        setIsLoading(false);
      });
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Products</h2>
          <Link 
            to="/products" 
            className="hidden sm:flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <ProductGrid 
          products={products} 
          isLoading={isLoading} 
          error={error}
          retryFn={handleRetry}
        />
        
        <div className="mt-8 text-center sm:hidden">
          <Link 
            to="/products" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View All Products
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;