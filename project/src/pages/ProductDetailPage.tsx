import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { getProduct } from '../services/api';
import { useCartStore } from '../store/cartStore';
import Button from '../components/ui/Button';
import Rating from '../components/ui/Rating';
import Spinner from '../components/ui/Spinner';
import ErrorMessage from '../components/ui/ErrorMessage';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getProduct(id);
        setProduct(data);
        document.title = `${data.title} | Mellow`;
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load product'));
      } finally {
        setIsLoading(false);
      }
    };
    
    window.scrollTo(0, 0);
    fetchProduct();
  }, [id]);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
    }
  };
  
  const handleRetry = () => {
    if (!id) return;
    
    setIsLoading(true);
    setError(null);
    
    getProduct(id)
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error('Failed to load product'));
        setIsLoading(false);
      });
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/products" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
          <ChevronLeft className="mr-1 h-5 w-5" />
          Back to Products
        </Link>
        
        <ErrorMessage 
          message="Failed to load product details. Please try again later."
          retryFn={handleRetry}
          className="mt-8"
        />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
        <ChevronLeft className="mr-1 h-5 w-5" />
        Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg p-8 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-w-full max-h-[400px] object-contain"
          />
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>
          
          <div className="flex items-center mb-4">
            <Rating rating={product.rating.rate} count={product.rating.count} className="mr-4" />
            <span className="text-sm text-gray-500">Category: {product.category}</span>
          </div>
          
          <p className="text-3xl font-bold text-gray-900 mb-6">
            ${product.price.toFixed(2)}
          </p>
          
          <div className="prose prose-sm text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <div className="flex w-32 h-10 border border-gray-300 rounded-md">
              <button 
                type="button"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="w-10 flex items-center justify-center border-r border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              >
                -
              </button>
              <input 
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                min="1"
                className="w-12 text-center focus:outline-none"
              />
              <button 
                type="button"
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-10 flex items-center justify-center border-l border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleAddToCart}
              className="flex-1"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Link to="/cart" className="flex-1">
              <Button 
                variant="secondary" 
                size="lg"
                className="w-full"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                View Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;