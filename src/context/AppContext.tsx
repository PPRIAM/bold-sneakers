'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  name?: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
};

type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

type AppContextType = {
  user: User | null;
  cart: CartItem[];
  login: (email: string) => Promise<void>;
  logout: () => void;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  checkout: () => Promise<void>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const sessionId = 'default-session';

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch(`/api/cart?sessionId=${sessionId}`);
      if (!res.ok) {
        console.error('Failed to fetch cart:', res.status, await res.text());
        return;
      }
      const data = await res.json();
      if (data.data?.items) setCart(data.data.items);
    } catch (err) {
      console.error('fetchCart error:', err);
    }
  };

  const login = async (email: string) => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.data?.user) {
        setUser(data.data.user);
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addToCart = async (productId: string, quantity = 1) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity, sessionId })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error('Add to cart API error:', res.status, errData);
        return;
      }
      await fetchCart();
      setIsCartOpen(true);
    } catch (err) {
      console.error('Add to cart failed', err);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      await fetch(`/api/cart?id=${itemId}`, {
        method: 'DELETE',
      });
      await fetchCart();
    } catch (err) {
      console.error('Remove from cart failed', err);
    }
  };

  const checkout = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    try {
      await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, total, sessionId })
      });
      await fetchCart();
      setIsCartOpen(false);
      alert("Checkout successful!");
    } catch (err) {
      console.error('Checkout failed', err);
    }
  };

  return (
    <AppContext.Provider value={{ user, cart, login, logout, addToCart, removeFromCart, checkout, isCartOpen, setIsCartOpen }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
