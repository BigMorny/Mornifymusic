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
      <svg
  className="logo"
  xmlns="http://www.w3.org/2000/svg"
  width="40"
  height="40"
  viewBox="0 0 100 100"
  role="img"
  aria-label="Mornyfy Logo"
>
  <circle cx="50" cy="50" r="48" stroke="#007bff" strokeWidth="4" fill="none" />
  <text
    x="50%"
    y="55%"
    textAnchor="middle"
    fontSize="60"
    fontFamily="Arial, sans-serif"
    fill="#007bff"
    fontWeight="bold"
    dominantBaseline="middle"
  >
    M
  </text>
</svg>

      <h1>Mornyfy</h1>
    </header>
  );
}

export default Header;