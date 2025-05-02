import React from 'react';
import useAudioPlayer from '../hooks/useAudioPlayer';

function SongDetailWindow({ song, onClose, onNext, onPrev }) {
  const { audioRef, isPlaying, togglePlay, volume, handleVolumeChange } = useAudioPlayer(song, false, (state) => state);

  if (!song) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} tabIndex={0}>
        <img
          src={song.cover || 'https://via.placeholder.com/150?text=No+Cover'}
          alt={song.album || 'Unknown Album'}
          className="detail-cover"
        />
        <div className="detail-info">
          <h2>{song.title || 'Unknown Title'}</h2>
          <h3>{song.artist || 'Unknown Artist'}</h3>
          <p>Album: {song.album || 'Unknown Album'}</p>
          <p>Duration: {song.duration || 'Unknown'}</p>
        </div>
        <audio ref={audioRef} src={song.audioSrc} onError={(e) => console.error('Audio error:', e)} />
        <div className="detail-controls">
          <button onClick={onPrev} aria-label="Previous song">&#9664;&#9664;</button>
          <button onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button onClick={onNext} aria-label="Next song">&#9654;&#9654;</button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-control"
            aria-label="Volume control"
          />
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Close dialog">&times;</button>
      </div>
    </div>
  );
}

export default SongDetailWindow;