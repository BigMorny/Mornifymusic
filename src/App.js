import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Playlist from './components/Playlist';
import Player from './components/Player';
import Library from './components/Library';
import SongDetailWindow from './components/SongDetailWindow';
import Playlists from './components/Playlists';
import songsData from './data/songsUpdated';

function App() {
  const [songs, setSongs] = useState(songsData);
  const [filteredSongs, setFilteredSongs] = useState(songsData);
  const [currentSong, setCurrentSong] = useState(songsData[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [librarySongs, setLibrarySongs] = useState([]);
  const [currentView, setCurrentView] = useState('playlist');
  const [detailSong, setDetailSong] = useState(null);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleSongSelect = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleToggleSelect = (song) => {
    if (selectedSongs.includes(song)) {
      setSelectedSongs(selectedSongs.filter((s) => s !== song));
    } else {
      setSelectedSongs([...selectedSongs, song]);
    }
  };

  const handleCreatePlaylist = () => {
    const newPlaylist = {
      id: playlists.length + 1,
      name: `Playlist ${playlists.length + 1}`,
      songs: selectedSongs,
    };
    setPlaylists([...playlists, newPlaylist]);
    setSelectedSongs([]);
    setCurrentView('playlists');
  };

  const handleRemoveFromLibrary = (song) => {
    setLibrarySongs(librarySongs.filter((s) => s.id !== song.id));
  };

  const handleSelectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setCurrentView('playlistDetail');
  };

  const handleNext = () => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  const closeDetailWindow = () => {
    setDetailSong(null);
  };

  return (
    <div className="app">
      <Header onMenuToggle={toggleSidebar} />
      <div className="main-content">
        <Sidebar
          onSearch={handleSearch}
          onViewChange={handleViewChange}
          currentView={currentView}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="right-column">
          {(currentView === 'playlist' || currentView === 'createPlaylist') && (
            <>
              <Playlist
                songs={filteredSongs}
                onSongSelect={handleSongSelect}
                currentSong={currentSong}
                onToggleSelect={currentView === 'createPlaylist' ? handleToggleSelect : undefined}
                selectedSongs={currentView === 'createPlaylist' ? selectedSongs : []}
                showCheckboxes={currentView === 'createPlaylist'}
              />
              {currentView === 'createPlaylist' && (
                <button
                  onClick={handleCreatePlaylist}
                  disabled={selectedSongs.length === 0}
                  aria-label="Create new playlist"
                >
                  Create Playlist
                </button>
              )}
            </>
          )}
          {currentView === 'library' && (
            <Library
              librarySongs={librarySongs}
              onSongSelect={handleSongSelect}
              currentSong={currentSong}
              onRemove={handleRemoveFromLibrary}
            />
          )}
          {currentView === 'playlists' && (
            <Playlists playlists={playlists} onSelectPlaylist={handleSelectPlaylist} />
          )}
          {currentView === 'playlistDetail' && selectedPlaylist && (
            <Playlist
              songs={selectedPlaylist.songs}
              onSongSelect={handleSongSelect}
              currentSong={currentSong}
              onToggleSelect={() => {}}
              selectedSongs={[]}
            />
          )}
          <Player
            song={currentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </div>
      </div>
      {detailSong && (
        <SongDetailWindow
          song={detailSong}
          onClose={closeDetailWindow}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
}

export default App;
