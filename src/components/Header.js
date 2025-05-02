import React from 'react';

function Header({ onMenuToggle }) {
  return (
    <header className="header">
      <button
        className="menu-button"
        onClick={onMenuToggle}
        aria-label="Toggle sidebar menu"
      >
        &#9776;
      </button>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
        alt="Mornyfy Logo"
        className="logo"
      />
      <h1>Mornyfy</h1>
    </header>
  );
}

export default Header;