import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, X } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import Button from '../ui/Button';

interface MiniCartProps {
  onClose: () => void;
}

const MiniCart: React.FC<MiniCartProps> = ({ onClose }) => {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCartStore();

  if (totalItems === 0) {
    return (
      <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-medium">Your Cart</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-8 text-center">
          <ShoppingCart className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/products">
            <Button
              variant="primary"
              size="sm"
              onClick={onClose}
            >
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium">Your Cart ({totalItems})</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="p-4 border-b border-gray-200 flex">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-16 h-16 object-contain rounded"
            />
            <div className="ml-4 flex-1">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</h4>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm font-medium text-gray-900">
                  ${item.price.toFixed(2)}
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700"
                  >
                    -
                  </button>
                  <span className="mx-1 w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-xs text-red-600 hover:text-red-800 mt-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between py-2">
          <span className="font-medium">Subtotal:</span>
          <span className="font-medium">${totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="mt-4 space-y-2">
          <Link to="/cart" onClick={onClose}>
            <Button variant="outline" fullWidth>
              View Cart
            </Button>
          </Link>
          <Link to="/checkout" onClick={onClose}>
            <Button variant="primary" fullWidth>
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;