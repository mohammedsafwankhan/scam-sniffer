import React from 'react';
import '../styles/NeonButton.css';

export default function NeonButton({ text, onClick, link, ariaLabel, type = 'button', disabled = false }) {
  if (link) {
    return (
      <a
        className="neon-button"
        href={link}
        aria-label={ariaLabel || text}
      >
        <span className="neon-inner">{text}</span>
      </a>
    );
  }

  return (
    <button
      type={type}
      className="neon-button"
      onClick={onClick}
      aria-label={ariaLabel || text}
      disabled={disabled}
    >
      <span className="neon-inner">{text}</span>
    </button>
  );
}
