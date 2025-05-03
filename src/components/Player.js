import React, { useEffect, useRef, useState } from 'react';

function Player({ song, isPlaying, setIsPlaying, onNext, onPrev }) {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);

  // Load new song when it changes
  useEffect(() => {
    if (audioRef.current && song?.audioSrc) {
      audioRef.current.src = song.audioSrc;
      audioRef.current.load();
    }
  }, [song]);

  // Play or pause based on isPlaying
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Audio play error:', error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="player">
      <img src={song?.cover} alt={song?.title} className="cover" />
      <div className="controls-vertical">
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
      <audio ref={audioRef} controls>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default Player;
