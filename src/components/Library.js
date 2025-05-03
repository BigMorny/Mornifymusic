import React from 'react';

function Library({ librarySongs, onSongSelect, currentSong, onRemove }) {
  if (librarySongs.length === 0) {
    return (
      <div className="library">
        <h2>Your Library</h2>
        <p>No songs in your library yet.</p>
      </div>
    );
  }

  return (
    <div className="library">
      <h2>Your Library</h2>
      <ul>
        {librarySongs.map((song) => (
          <li
            key={song.id}
            className={currentSong?.id === song.id ? 'active' : ''}
            onClick={() => onSongSelect(song)}
          >
            <img
              src={song.cover || 'https://via.placeholder.com/150?text=No+Cover'}
              alt={`${song.title} by ${song.artist || 'Unknown Artist'}`}
              className="cover"
            />
            <div className="song-info">
              <span className="title">{song.title || 'Unknown Title'}</span>
              <span className="artist">{song.artist || 'Unknown Artist'}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(song.id);
              }}
              className="remove-btn"
              aria-label={`Remove ${song.title} from library`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Library;