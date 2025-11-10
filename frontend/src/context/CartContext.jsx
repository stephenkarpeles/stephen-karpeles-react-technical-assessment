import { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error parsing stored cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Sync with backend if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      syncWithBackend();
    }
  }, [isAuthenticated]);

  const syncWithBackend = async () => {
    try {
      const response = await cartAPI.get();
      if (response.data.success) {
        const backendCart = response.data.data.items || [];
        setCart(backendCart);
      }
    } catch (error) {
      console.error('Error syncing cart:', error);
      // Continue with local cart if backend sync fails
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      // Check if product already exists in cart
      const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
      
      let newCart;
      if (existingItemIndex > -1) {
        // Update quantity
        newCart = [...cart];
        newCart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        newCart = [...cart, { product, quantity }];
      }
      
      setCart(newCart);

      // Sync with backend if authenticated
      if (isAuthenticated) {
        await cartAPI.add(product.id, quantity);
      }

      return { success: true, message: 'Added to cart successfully' };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, message: 'Failed to add to cart' };
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        return removeFromCart(productId);
      }

      const newCart = cart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      
      setCart(newCart);

      // Sync with backend if authenticated
      if (isAuthenticated) {
        await cartAPI.update(productId, quantity);
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating quantity:', error);
      return { success: false, message: 'Failed to update quantity' };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const newCart = cart.filter(item => item.product.id !== productId);
      setCart(newCart);

      // Sync with backend if authenticated
      if (isAuthenticated) {
        await cartAPI.remove(productId);
      }

      return { success: true };
    } catch (error) {
      console.error('Error removing from cart:', error);
      return { success: false, message: 'Failed to remove from cart' };
    }
  };

  const clearCart = async () => {
    try {
      setCart([]);

      // Sync with backend if authenticated
      if (isAuthenticated) {
        await cartAPI.clear();
      }

      return { success: true };
    } catch (error) {
      console.error('Error clearing cart:', error);
      return { success: false };
    }
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

