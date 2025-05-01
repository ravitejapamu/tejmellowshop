import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ArrowDownUp } from 'lucide-react';
import { Product } from '../types';
import { getProducts, getCategories } from '../services/api';
import ProductGrid from '../components/products/ProductGrid';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Get category from search params
  const categoryParam = searchParams.get('category');
  const sortParam = searchParams.get('sort') || 'default';
  
  // Fetch products and categories
  useEffect(() => {
    document.title = 'Products | Mellow';
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load data'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (categoryParam) {
      result = result.filter(product => product.category === categoryParam);
    }
    
    // Sort products
    switch (sortParam) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        // Default sorting (no specific order)
        break;
    }
    
    setFilteredProducts(result);
  }, [products, categoryParam, sortParam]);
  
  const handleCategoryChange = (category: string | null) => {
    if (category) {
      searchParams.set('category', category);
    } else {
      searchParams.delete('category');
    }
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };
  
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === 'default') {
      searchParams.delete('sort');
    } else {
      searchParams.set('sort', value);
    }
    setSearchParams(searchParams);
  };
  
  const handleRetry = () => {
    window.location.reload();
  };
  
  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {categoryParam ? formatCategoryName(categoryParam) : 'All Products'}
        </h1>
        <p className="text-gray-600 mt-2">
          {!isLoading && `Showing ${filteredProducts.length} products`}
        </p>
      </div>
      
      {/* Filters and Sort */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
        <div>
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="sm:hidden inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
          
          <div className={`sm:flex space-x-2 mt-4 sm:mt-0 ${mobileFiltersOpen ? 'block' : 'hidden'}`}>
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-3 py-1 rounded-full text-sm ${
                !categoryParam
                  ? 'bg-primary-100 text-primary-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  categoryParam === category
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {formatCategoryName(category)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center">
          <ArrowDownUp className="h-5 w-5 text-gray-400 mr-2" />
          <select
            value={sortParam}
            onChange={handleSortChange}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="rating-desc">Best Rating</option>
          </select>
        </div>
      </div>
      
      {/* Products Grid */}
      <ProductGrid 
        products={filteredProducts}
        isLoading={isLoading}
        error={error}
        retryFn={handleRetry}
      />
    </div>
  );
};

export default ProductsPage;