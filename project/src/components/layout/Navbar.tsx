import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import Badge from '../ui/Badge';
import MiniCart from '../cart/MiniCart';
import SearchResults from '../search/SearchResults';
import { useCartStore } from '../../store/cartStore';
import { useSearchStore } from '../../store/searchStore';
import { searchProducts } from '../../services/api';
import { useDebounce } from '../../hooks/useDebounce';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  
  const { totalItems } = useCartStore();
  const { 
    setSearchQuery, 
    setSearchResults, 
    setIsSearching,
    clearSearch 
  } = useSearchStore();
  
  const location = useLocation();
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
    setIsSearchOpen(false);
    clearSearch();
    setSearchInput('');
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isCartOpen && !target.closest('.cart-container')) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isCartOpen]);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearch.length >= 2) {
        setIsSearching(true);
        setSearchQuery(debouncedSearch);
        try {
          const results = await searchProducts(debouncedSearch);
          setSearchResults(results);
          setIsSearchOpen(true);
        } catch (error) {
          console.error('Search failed:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        clearSearch();
        setIsSearchOpen(false);
      }
    };

    performSearch();
  }, [debouncedSearch]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchInput('');
    clearSearch();
  };

  const navbarClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-800">Mellow</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/products" className="font-medium hover:text-primary-600 transition-colors">
              Products
            </Link>
            <a href="#about" className="font-medium hover:text-primary-600 transition-colors">
              About
            </a>
            <a href="#contact" className="font-medium hover:text-primary-600 transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="flex items-center bg-gray-100 rounded-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  className="w-40 sm:w-60 px-4 py-2 bg-transparent rounded-l-full focus:outline-none"
                />
                <button className="p-2 hover:bg-gray-200 rounded-r-full transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="relative cart-container">
              <button 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                onClick={toggleCart}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge count={totalItems} className="absolute -top-1 -right-1" />
                )}
              </button>
              
              {isCartOpen && <MiniCart onClose={() => setIsCartOpen(false)} />}
            </div>

            <button 
              className="p-2 md:hidden hover:bg-gray-100 rounded-full transition-colors"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 w-full border-t border-gray-200 shadow-lg">
            <div className="flex flex-col py-4 px-6">
              <Link 
                to="/" 
                className="py-3 px-4 hover:bg-gray-50 rounded-md transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="py-3 px-4 hover:bg-gray-50 rounded-md transition-colors"
              >
                Products
              </Link>
              <a 
                href="#about"
                className="py-3 px-4 hover:bg-gray-50 rounded-md transition-colors"
              >
                About
              </a>
              <a 
                href="#contact"
                className="py-3 px-4 hover:bg-gray-50 rounded-md transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>

      {isSearchOpen && <SearchResults onClose={closeSearch} />}
    </header>
  );
};

export default Navbar;