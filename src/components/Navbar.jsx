import React, { useState } from 'react';
import { Heart, Zap, User, Mail, Phone, Shield, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '../contexts/GamificationContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const [showProfile, setShowProfile] = useState(false);
  const { score, streak } = useGamification();
  
  const dummyProfile = {
    name: "Meghana",
    email: "megharelangi@gmail.com",
    phone: "+91 9876543210",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" // Girl themed avatar
  };
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      background: 'rgba(10, 10, 18, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Vita Side */}
      <div 
        onClick={() => setActiveTab('vita')}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          cursor: 'pointer',
          opacity: activeTab === 'vita' ? 1 : 0.5,
          transition: 'opacity 0.3s'
        }}
      >
        <div style={{ position: 'relative' }} onMouseEnter={() => setShowProfile(true)} onMouseLeave={() => setShowProfile(false)}>
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '4px', borderRadius: '50%', overflow: 'hidden', display: 'flex' }}>
             <img src={dummyProfile.avatar} alt="Profile" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Heart size={20} color="#EF4444" fill={activeTab === 'vita' ? "#EF4444" : "none"} />
          <span style={{ fontWeight: 600, fontSize: '1.2rem', color: activeTab === 'vita' ? '#EF4444' : 'inherit' }}>Vita</span>
        </div>
      </div>

      {/* Center Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="/logo.png" alt="VitaNova Logo" style={{ height: '40px', width: 'auto', borderRadius: '8px' }} onError={(e) => { e.target.style.display = 'none'; }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
          <span className="glow-text">Vita</span>Nova
        </h2>
      </div>

      {/* Nova Side */}
      <div 
        onClick={() => setActiveTab('nova')}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          cursor: 'pointer',
          opacity: activeTab === 'nova' ? 1 : 0.5,
          transition: 'opacity 0.3s'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontWeight: 600, fontSize: '1.2rem', color: activeTab === 'nova' ? '#FACC15' : 'inherit' }}>Nova</span>
          <Zap size={20} color="#FACC15" fill={activeTab === 'nova' ? "#FACC15" : "none"} />
        </div>
        <div style={{ position: 'relative' }} onMouseEnter={() => setShowProfile(true)} onMouseLeave={() => setShowProfile(false)}>
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '4px', borderRadius: '50%', overflow: 'hidden', display: 'flex' }}>
             <img src={dummyProfile.avatar} alt="Profile" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
          </div>
          
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  width: '260px',
                  background: 'rgba(20, 20, 25, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                  zIndex: 200,
                  cursor: 'default'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <img src={dummyProfile.avatar} alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #3b82f6' }} />
                  <div>
                    <h4 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>{dummyProfile.name}</h4>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.8rem', color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)', padding: '2px 8px', borderRadius: '10px' }}>Premium</span>
                      <span style={{ fontSize: '0.8rem', color: '#FACC15', background: 'rgba(250, 204, 21, 0.1)', padding: '2px 8px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}><Target size={12} /> {score} pts</span>
                      <span style={{ fontSize: '0.8rem', color: '#F97316', background: 'rgba(249, 115, 22, 0.1)', padding: '2px 8px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>🔥 {streak} Day</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
                    <Mail size={16} /> <span style={{ fontSize: '0.9rem' }}>{dummyProfile.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
                    <Phone size={16} /> <span style={{ fontSize: '0.9rem' }}>{dummyProfile.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
                    <Shield size={16} /> <span style={{ fontSize: '0.9rem' }}>Account Security Active</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
