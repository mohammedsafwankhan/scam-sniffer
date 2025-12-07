import React from 'react';
import '../styles/Navigation.css'; // reuse styles for spinner

export default function LoadingSpinner({ fullscreen = true }) {
  return (
    <div className={fullscreen ? 'spinner-wrap full' : 'spinner-wrap'}>
      <div className="spinner">
        <div className="dot" />
      </div>
    </div>
  );
}
