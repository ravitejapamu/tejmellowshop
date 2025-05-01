import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCartStore } from '../../store/cartStore';

interface CartItemProps {
  item: CartItemType;
  isMiniCart?: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ item, isMiniCart = false }) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  if (isMiniCart) {
    return (
      <div className="flex items-center py-2 space-x-3">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-12 h-12 object-contain rounded"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
          <div className="flex justify-between text-sm text-gray-500">
            <span>${item.price.toFixed(2)} × {item.quantity}</span>
            <span className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-gray-200">
      <div className="flex-shrink-0 bg-gray-100 rounded-md p-2 w-24 h-24 flex items-center justify-center">
        <img 
          src={item.image} 
          alt={item.title} 
          className="max-h-full max-w-full object-contain"
        />
      </div>
      
      <div className="flex-1 ml-0 sm:ml-6 mt-4 sm:mt-0">
        <div className="flex justify-between">
          <div>
            <Link 
              to={`/products/${item.id}`} 
              className="text-gray-900 text-lg font-medium hover:text-primary-600"
            >
              {item.title}
            </Link>
          </div>
          <div className="font-medium text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
        
        <div className="mt-2 flex justify-between items-center">
          <div className="flex items-center border rounded w-max">
            <button
              type="button"
              className="p-2 hover:bg-gray-100 transition-colors"
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              -
            </button>
            <span className="px-4">{item.quantity}</span>
            <button
              type="button"
              className="p-2 hover:bg-gray-100 transition-colors"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              +
            </button>
          </div>
          
          <button
            type="button"
            className="text-gray-400 hover:text-red-600 transition-colors flex items-center"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            <span className="text-sm">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;