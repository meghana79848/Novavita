import React from 'react';
import { motion } from 'framer-motion';

export default function ActionCard({ title, icon, description, onClick, color, layoutId }) {
  return (
    <motion.div
      layoutId={`card-container-${layoutId}`}
      whileHover={{ y: -10, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-card"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '15px',
        borderTop: `3px solid ${color || 'var(--primary-blue)'}`,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }}
    >
      {/* Cool tech background pattern */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.03) 0%, transparent 20%), linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <motion.div 
        layoutId={`card-icon-${layoutId}`}
        style={{
          background: `rgba(255, 255, 255, 0.1)`,
          padding: '14px',
          borderRadius: '16px',
          color: color || 'white',
          zIndex: 2,
          boxShadow: `0 0 20px ${color}40`,
          border: `1px solid rgba(255,255,255,0.1)`
        }}
      >
        {icon}
      </motion.div>
      <motion.h3 layoutId={`card-title-${layoutId}`} style={{ fontSize: '1.3rem', margin: 0, zIndex: 2, fontWeight: '700', letterSpacing: '0.5px' }}>{title}</motion.h3>
      <motion.p layoutId={`card-desc-${layoutId}`} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5', zIndex: 2 }}>
        {description}
      </motion.p>

      {/* Decorative technical line */}
      <motion.div 
         initial={{ width: 0 }}
         animate={{ width: "30%" }}
         transition={{ duration: 1, delay: 0.2 }}
         style={{ height: '2px', background: color, zIndex: 2, borderRadius: '4px' }} 
      />

      {/* Decorative background glow */}
      <div style={{
        position: 'absolute',
        top: '-50%', left: '-50%',
        width: '200%', height: '200%',
        background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
        opacity: 0,
        transition: 'opacity 0.3s ease',
        zIndex: 0
      }} className="card-glow" />
    </motion.div>
  );
}
