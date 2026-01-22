import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { type Character } from '../types';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
  isSelected: boolean;
}

// Color de la etiqueta según el status
const getStatusColor = (status: string) => {
  if (status === 'Alive') return 'success';
  if (status === 'Dead') return 'error';
  return 'default';
};

export const CharacterCard = ({ character, onClick, isSelected }: CharacterCardProps) => {
  const statusColor = getStatusColor(character.status);

  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: isSelected ? 2 : 0,
        borderColor: 'primary.main',
        boxShadow: isSelected ? 6 : 2,
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 8,
        },
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={character.image}
        alt={character.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom noWrap>
          {character.name}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
          <Chip label={character.status} color={statusColor} size="small" />
          <Chip label={character.species} variant="outlined" size="small" />
        </Box>

        <Typography variant="body2" color="text.secondary" noWrap>
          {'📍 ' + character.location.name}
        </Typography>
      </CardContent>
    </Card>
  );
};