import { Box, Button, Grid, Typography, CircularProgress } from '@mui/material';
import { type Character } from '../types';
import { CharacterCard } from './CharacterCard';

interface CharacterListProps {
  characters: Character[];
  selectedCharacterId: number | null;
  onSelectCharacter: (character: Character) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  loadingMore: boolean;
}

export const CharacterList = ({
  characters,
  selectedCharacterId,
  onSelectCharacter,
  onLoadMore,
  hasMore,
  loadingMore,
}: CharacterListProps) => {
  // Estado vacio (no encuentra)
  if (characters.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No se encontraron personajes
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Intenta con otra busqueda o filtro
        </Typography>
      </Box>
    );
  }

  const buttonText = loadingMore ? 'Cargando...' : 'Cargar mas personajes';
  const buttonIcon = loadingMore ? <CircularProgress size={20} color="inherit" /> : undefined;

  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {characters.map((character) => (
          // No entiendo el error (está como en la documentación)
          <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
            <CharacterCard
              character={character}
              onClick={() => onSelectCharacter(character)}
              isSelected={character.id === selectedCharacterId}
            />
          </Grid>
        ))}
      </Grid>

      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={onLoadMore}
            disabled={loadingMore}
            startIcon={buttonIcon}
          >
            {buttonText}
          </Button>
        </Box>
      )}
    </Box>
  );
};