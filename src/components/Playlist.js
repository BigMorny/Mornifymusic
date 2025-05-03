import React from 'react';

function Playlist({ songs, onSongSelect, currentSong, onToggleSelect, selectedSongs, showCheckboxes }) {
  return (
    <div className="playlist">
      <h2>Playlist</h2>
      <ul>
        {songs.map((song) => (
          <li
            key={song.id}
            className={currentSong?.id === song.id ? 'active' : ''}
          >
            {showCheckboxes && (
              <input
                type="checkbox"
                checked={selectedSongs.includes(song.id)}
                onChange={() => onToggleSelect(song.id)}
                aria-label={`Select ${song.title} for playlist`}
              />
            )}
            <img
              src={song.cover || 'https://via.placeholder.com/150?text=No+Cover'}
              alt={`${song.title} by ${song.artist || 'Unknown Artist'}`}
              className="cover"
            />
            <div className="song-info" onClick={() => onSongSelect(song)}>
              <span className="title">{song.title || 'Unknown Title'}</span>
              <span className="artist">{song.artist || 'Unknown Artist'}</span>
            </div>
            <span className="duration">{song.duration || 'Unknown'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;