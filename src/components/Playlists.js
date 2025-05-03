import React, { useState } from 'react';

function Playlists({ playlists, onSelectPlaylist }) {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  const handleSelect = (playlist) => {
    setSelectedPlaylistId(playlist.id);
    onSelectPlaylist(playlist);
  };

  return (
    <div className="playlists">
      <h2>Playlists</h2>
      {playlists.length === 0 ? (
        <p aria-live="polite">No playlists created yet.</p>
      ) : (
        <ul>
          {playlists.map((playlist) => (
            <li
              key={playlist.id}
              className={selectedPlaylistId === playlist.id ? 'active' : ''}
              onClick={() => handleSelect(playlist)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(playlist)}
              aria-label={`Select playlist ${playlist.name}`}
            >
              {playlist.name} ({playlist.songs.length} songs)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Playlists;