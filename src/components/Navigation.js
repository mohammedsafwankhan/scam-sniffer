import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

export default function Navigation() {
  const loc = useLocation();

  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <div className="brand">
          <span className="brand-neon">Scam</span>
          <span className="brand-muted">Sniffer</span>
        </div>
      </div>

      <div className="nav-center">
        <Link className={`nav-link ${loc.pathname === '/' ? 'active' : ''}`} to="/">
          Report
        </Link>
        <Link className={`nav-link ${loc.pathname === '/dashboard' ? 'active' : ''}`} to="/dashboard">
          Dashboard
        </Link>
        <Link  className={`nav-link ${loc.pathname === '/Rewards' ? 'active' : ''}`} to='/Rewards' >Rewards</Link>

      </div>

      <div className="nav-right">
        <div className="nav-status">Live</div>
      </div>
    </nav>
  );
}
