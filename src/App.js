import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import LoadingSpinner from './components/LoadingSpinner';
import Report from './pages/Report';
import Dashboard from './pages/Dashboard';
import './styles/global.css';
import Rewards from './Rewards';

export default function App() {
  const location = useLocation();

  return (
    <div>
      <Navigation />
      <React.Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Report />
              </motion.div>
            } />
            <Route path="/dashboard" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Dashboard />
              </motion.div>
            } />
            <Route path="/Rewards" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Rewards />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </React.Suspense>
    </div>
  );
}
