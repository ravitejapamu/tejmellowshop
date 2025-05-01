import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      
      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find((cartItem) => cartItem.id === item.id);
        
        if (existingItem) {
          // If item already exists in cart, increment quantity
          const updatedItems = items.map((cartItem) => 
            cartItem.id === item.id 
              ? { ...cartItem, quantity: cartItem.quantity + 1 } 
              : cartItem
          );
          
          set((state) => ({
            items: updatedItems,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + item.price,
          }));
        } else {
          // Add new item to cart
          set((state) => ({
            items: [...state.items, { ...item, quantity: 1 }],
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + item.price,
          }));
        }
      },
      
      removeItem: (id) => {
        const { items } = get();
        const itemToRemove = items.find((item) => item.id === id);
        
        if (!itemToRemove) return;
        
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
          totalItems: state.totalItems - itemToRemove.quantity,
          totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity),
        }));
      },
      
      updateQuantity: (id, quantity) => {
        const { items } = get();
        const item = items.find((item) => item.id === id);
        
        if (!item) return;
        
        const quantityDifference = quantity - item.quantity;
        
        if (quantity <= 0) {
          // If quantity is zero or negative, remove item
          get().removeItem(id);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) => 
            item.id === id ? { ...item, quantity } : item
          ),
          totalItems: state.totalItems + quantityDifference,
          totalPrice: state.totalPrice + (item.price * quantityDifference),
        }));
      },
      
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },
    }),
    {
      name: 'mellow-cart-storage',
    }
  )
);