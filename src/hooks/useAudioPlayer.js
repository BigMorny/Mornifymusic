import { useState, useRef, useEffect } from 'react';

function useAudioPlayer(song, autoPlay = false, onStateChange) {
  const audioRef = useRef(new Audio(song ? song.audioSrc : null));
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (song) {
      audioRef.current.src = song.audioSrc;
      if (autoPlay) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  }, [song, autoPlay]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (onStateChange) {
      onStateChange({ isPlaying, volume });
    }
  }, [isPlaying, volume, onStateChange]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return {
    audioRef,
    isPlaying,
    togglePlay,
    volume,
    handleVolumeChange,
  };
}

export default useAudioPlayer;
