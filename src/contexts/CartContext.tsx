import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    description: string;
    features: string[];
  };
  plan: {
    name: string;
    price: number;
    period: string;
    specs: string;
  };
  quantity: number;
  provider: {
    name: string;
    domain: string;
  };
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, plan: any, provider: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: any, plan: any, provider: any) => {
    const cartItem: CartItem = {
      id: `${product.id}-${plan.name}-${Date.now()}`,
      product,
      plan,
      quantity: 1,
      provider: {
        name: provider.name,
        domain: provider.domain
      }
    };

    setCart(prevCart => [...prevCart, cartItem]);
    toast.success(`${product.name} - ${plan.name} added to cart!`);
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + (item.plan.price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

