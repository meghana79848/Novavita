import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import VitaHub from '../components/Vita/VitaHub';
import NovaHub from '../components/Nova/NovaHub';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('vita'); // 'vita' | 'nova'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'vita' ? (
            <motion.div
              key="vita"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <VitaHub />
            </motion.div>
          ) : (
            <motion.div
              key="nova"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <NovaHub />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
