import React from 'react';

function Sidebar({ onSearch, onViewChange, currentView, isOpen, onClose }) {
  const handleNavClick = (view) => {
    onViewChange(view);
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  const handleCreatePlaylistClick = () => {
    handleNavClick('createPlaylist');
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />}
      <div className={`sidebar${isOpen ? ' open' : ''}`} tabIndex={isOpen ? 0 : -1}>
        <button className="close-btn" onClick={onClose} aria-label="Close sidebar">×</button>
        <input
          type="text"
          placeholder="Search songs..."
          onChange={(e) => onSearch(e.target.value)}
          className="search-input"
          aria-label="Search songs"
        />
        <nav>
          <ul>
            <li
              className={currentView === 'playlist' ? 'active' : ''}
              onClick={() => handleNavClick('playlist')}
            >
              Playlist
            </li>
            <li
              className={currentView === 'library' ? 'active' : ''}
              onClick={() => handleNavClick('library')}
            >
              Library
            </li>
            <li
              className={currentView === 'playlists' ? 'active' : ''}
              onClick={() => handleNavClick('playlists')}
            >
              Playlists
            </li>
            <li
              className="create-playlist"
              onClick={handleCreatePlaylistClick}
              style={{ cursor: 'pointer', marginTop: '10px', fontWeight: 'bold' }}
            >
              + Create Playlist
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;