import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('premium-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('premium-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      let selectedSize = product.selectedSize;
      let price = product.price;
      
      if (product.sizes && product.sizes.length > 0) {
        if (!selectedSize) {
          const defaultVariant = product.sizes[0];
          selectedSize = defaultVariant.size;
          price = defaultVariant.price;
        } else {
          const variant = product.sizes.find(s => s.size === selectedSize);
          if (variant) {
            price = variant.price;
          }
        }
      }

      const cartItemId = selectedSize ? `${product.id}-${selectedSize}` : `${product.id}`;

      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item => item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { 
        ...product, 
        id: cartItemId, 
        productId: product.id, 
        selectedSize, 
        price, 
        quantity 
      }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
