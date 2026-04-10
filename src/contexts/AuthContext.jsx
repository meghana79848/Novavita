import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  function signup(email, password, name) {
    const users = JSON.parse(localStorage.getItem('vitanova_users') || '[]');
    if (users.find((u) => u.email === email)) {
      return Promise.reject(new Error('Email already registered'));
    }
    const newUser = { email, password, name, uid: 'mock_' + Date.now() };
    users.push(newUser);
    localStorage.setItem('vitanova_users', JSON.stringify(users));

    // Only simulate registration, do not set currentUser so the user has to login
    return Promise.resolve();
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem('vitanova_users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return Promise.reject(new Error('Invalid email or password'));
    }
    setCurrentUser(user);
    return Promise.resolve();
  }

  function logout() {
    setCurrentUser(null);
    return Promise.resolve();
  }

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setCurrentUser({
        email: result.user.email,
        name: result.user.displayName,
        uid: result.user.uid
      });
      return result;
    } catch (error) {
      console.error("Google Auth Error:", error);
      throw error;
    }
  }

  async function loginWithGithub() {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setCurrentUser({
        email: result.user.email,
        name: result.user.displayName,
        uid: result.user.uid
      });
      return result;
    } catch (error) {
      console.error("Github Auth Error:", error);
      throw error;
    }
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loginWithGoogle,
    loginWithGithub
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
