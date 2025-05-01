import React from 'react';
import { useSearchStore } from '../../store/searchStore';
import ProductGrid from '../products/ProductGrid';
import { X } from 'lucide-react';

interface SearchResultsProps {
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ onClose }) => {
  const { searchQuery, searchResults, isSearching, clearSearch } = useSearchStore();

  const handleClose = () => {
    clearSearch();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute inset-x-0 top-0 bg-white shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {searchResults.length > 0 
                ? `Found ${searchResults.length} results for "${searchQuery}"`
                : `No results found for "${searchQuery}"`}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <ProductGrid
            products={searchResults}
            isLoading={isSearching}
            error={null}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchResults;