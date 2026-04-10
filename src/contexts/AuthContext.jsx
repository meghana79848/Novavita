import React, { createContext, useContext, useState, useEffect } from 'react';
// import { auth } from '../firebase';
// import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock functions for UI demo purposes since we don't have an active Firebase project built yet
  function signup(email, password, name) {
    setCurrentUser({ email, name, uid: 'mock123' });
    return Promise.resolve();
  }

  function login(email, password) {
    setCurrentUser({ email, name: 'User', uid: 'mock123' });
    return Promise.resolve();
  }

  function logout() {
    setCurrentUser(null);
    return Promise.resolve();
  }

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
