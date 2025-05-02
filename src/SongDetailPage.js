import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAudioPlayer from './hooks/useAudioPlayer';
import songsData from './data/songsUpdated';


function SongDetailPage() {
  const { songId } = useParams();
  const navigate = useNavigate();
  const song = songsData.find((s) => s.id === parseInt(songId));
  const { audioRef, isPlaying, togglePlay, volume, handleVolumeChange } = useAudioPlayer(song, false, (state) => state);

  if (!song) {
    navigate('/');
    return null;
  }

  const handleNext = () => {
    const currentIndex = songsData.findIndex((s) => s.id === song.id);
    const nextIndex = (currentIndex + 1) % songsData.length;
    navigate(`/song/${songsData[nextIndex].id}`);
  };

  const handlePrev = () => {
    const currentIndex = songsData.findIndex((s) => s.id === song.id);
    const prevIndex = (currentIndex - 1 + songsData.length) % songsData.length;
    navigate(`/song/${songsData[prevIndex].id}`);
  };

  return (
    <div className="song-detail-page">
      <img
        src={song.cover || 'https://via.placeholder.com/150?text=No+Cover'}
        alt={song.album || 'Unknown Album'}
        className="detail-cover-large"
      />
      <div className="detail-info">
        <h1>{song.title || 'Unknown Title'}</h1>
        <h2>{song.artist || 'Unknown Artist'}</h2>
        <p>Album: {song.album || 'Unknown Album'}</p>
        <p>Duration: {song.duration || 'Unknown'}</p>
      </div>
      <audio ref={audioRef} src={song.audioSrc} onError={(e) => console.error('Audio error:', e)} />
      <div className="detail-controls">
        <button onClick={handlePrev} aria-label="Previous song">&#9664;&#9664;</button>
        <button onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button onClick={handleNext} aria-label="Next song">&#9654;&#9654;</button>
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
    </div>
  );
}

export default SongDetailPage;