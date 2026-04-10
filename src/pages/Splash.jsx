import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to Login after 4 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 1 }}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ textAlign: 'center' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
           <img src="/logo.png" alt="VitaNova" style={{ width: '120px', height: '120px', borderRadius: '24px', boxShadow: '0 0 40px rgba(96, 165, 250, 0.4)' }} onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
        <h1 style={{ fontSize: '4rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="glow-text">Vita</span>
          <span style={{ color: '#F3F4F6' }}>Nova</span>
        </h1>
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            width: '100px',
            height: '4px',
            background: 'linear-gradient(90deg, var(--primary-blue), var(--secondary-purple))',
            margin: '20px auto',
            borderRadius: '2px',
            boxShadow: '0 0 15px var(--secondary-purple)'
          }}
        />
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', letterSpacing: '2px' }}>
          HEAL. LEARN. GROW.
        </p>
      </motion.div>
      
      {/* Background Particles Mock */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: 'hidden' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: Math.random() * 800, x: Math.random() * 800, opacity: Math.random() }}
            animate={{ 
              y: [null, Math.random() * -200],
              opacity: [null, 0] 
            }}
            transition={{ 
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(255,255,255,0.8)'
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
