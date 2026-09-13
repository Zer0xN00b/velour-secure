"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface OrderItem {
  id: string;
  date: string;
  items: string[];
  total: number;
}

export interface Favorite {
  id: string;
  name: string;
  category: string;
}

interface AuthContextType {
  user: User | null;
  orderHistory: OrderItem[];
  favorites: Favorite[];
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  addFavorite: (item: { name: string; category: string }) => void;
  removeFavorite: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'velour_cafe_users';
const SESSION_KEY = 'velour_cafe_session';

interface StoredUser extends User {
  password: string;
}

function getStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function getSession(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function setSession(user: User | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

const seedOrders = (userId: string): OrderItem[] => [
  {
    id: `ord-${userId}-1`,
    date: '2026-09-08',
    items: ['Oat Milk Latte', 'Almond Croissant'],
    total: 12.50,
  },
  {
    id: `ord-${userId}-2`,
    date: '2026-09-02',
    items: ['Cold Brew', 'Avocado Toast', 'Blueberry Muffin'],
    total: 18.75,
  },
  {
    id: `ord-${userId}-3`,
    date: '2026-08-28',
    items: ['Cappuccino', 'Chocolate Chip Cookie'],
    total: 9.25,
  },
];

const seedFavorites = (userId: string): Favorite[] => [
  { id: `fav-${userId}-1`, name: 'Velour Signature Latte', category: 'Coffee' },
  { id: `fav-${userId}-2`, name: 'Pistachio Croissant', category: 'Pastries' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orderHistory, setOrderHistory] = useState<OrderItem[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setUser(session);
      setOrderHistory(seedOrders(session.id));
      const savedFavs = localStorage.getItem(`velour_favs_${session.id}`);
      setFavorites(savedFavs ? JSON.parse(savedFavs) : seedFavorites(session.id));
    }
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { success: false, error: 'Invalid email or password.' };
    }
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    setSession(safeUser);
    setOrderHistory(seedOrders(safeUser.id));
    const savedFavs = localStorage.getItem(`velour_favs_${safeUser.id}`);
    setFavorites(savedFavs ? JSON.parse(savedFavs) : seedFavorites(safeUser.id));
    return { success: true };
  };

  const signup = async (name: string, email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    const users = getStoredUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with that email already exists.' };
    }
    const newUser: StoredUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
    };
    users.push(newUser);
    saveStoredUsers(users);
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    setSession(safeUser);
    setOrderHistory([]);
    setFavorites([]);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setSession(null);
    setOrderHistory([]);
    setFavorites([]);
  };

  const resetPassword = async (email: string) => {
    await new Promise((r) => setTimeout(r, 500));
    const users = getStoredUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      // Don't reveal whether the email exists for security reasons, but simulate an email sent
      return { success: true };
    }
    // In a real app this would send an email. Just simulate success here.
    return { success: true };
  };

  const addFavorite = (item: { name: string; category: string }) => {
    if (!user) return;
    const newFav: Favorite = {
      id: `fav-${Date.now()}`,
      name: item.name,
      category: item.category,
    };
    const updated = [...favorites, newFav];
    setFavorites(updated);
    localStorage.setItem(`velour_favs_${user.id}`, JSON.stringify(updated));
  };

  const removeFavorite = (id: string) => {
    if (!user) return;
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    localStorage.setItem(`velour_favs_${user.id}`, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{ user, orderHistory, favorites, login, signup, logout, resetPassword, addFavorite, removeFavorite }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
