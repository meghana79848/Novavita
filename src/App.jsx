import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { useAuth } from './contexts/AuthContext';

function App() {
  const location = useLocation();
  const { currentUser } = useAuth();

  return (
    <div style={{ width: '100vw', minHeight: '100vh', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* We use location.pathname to trigger the exit/enter animations on route change */}
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
