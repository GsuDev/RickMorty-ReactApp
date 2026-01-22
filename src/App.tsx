import { useState } from 'react';
import { type Character } from './types';
import { useCharacters } from './hooks/useCharacters';
import { SearchBar } from './components/SearchBar';
import { FilterStatus } from './components/FilterStatus';
import { CharacterList } from './components/CharacterList';
import { CharacterDetail } from './components/CharacterDetail';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const {
    characters,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    loadMore,
    hasMore,
    loadingMore,
    requestCount,
  } = useCharacters();

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', color: '#2c3e50' }}>
          Rick and Morty
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Explora el multiverso de personajes
        </p>
        <p style={{ color: '#999', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Total de peticiones a la API: {requestCount}
        </p>
      </header>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <FilterStatus value={statusFilter} onChange={setStatusFilter} />

      {error && (
        <div
          style={{
            background: '#fee',
            border: '2px solid #fcc',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            color: '#c33',
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <CharacterList
          characters={characters}
          selectedCharacterId={selectedCharacter?.id || null}
          onSelectCharacter={setSelectedCharacter}
          onLoadMore={loadMore}
          hasMore={hasMore}
          loadingMore={loadingMore}
        />
      )}

      {selectedCharacter && (
        <CharacterDetail
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
}

export default App;