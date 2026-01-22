import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
  Divider,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { type Character } from '../types';

interface CharacterDetailProps {
  character: Character;
  onClose: () => void;
}

// Misma funcion que en CharacterCard (hacer un helper??)
const getStatusColor = (status: string) => {
  if (status === 'Alive') return 'success';
  if (status === 'Dead') return 'error';
  return 'default';
};

export const CharacterDetail = ({ character, onClose }: CharacterDetailProps) => {
  const statusColor = getStatusColor(character.status);
  const episodeCount = character.episode.length;

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2, maxHeight: '90vh' } }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'white',
          bgcolor: 'rgba(0,0,0,0.5)',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        component="img"
        src={character.image}
        alt={character.name}
        sx={{ width: '100%', maxHeight: 400, objectFit: 'cover' }}
      />

      <DialogContent sx={{ pt: 3 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {character.name}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <Chip label={character.status} color={statusColor} />
          <Chip label={character.species} variant="outlined" />
          <Chip label={character.gender} variant="outlined" />
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
          <div>
            <Typography variant="subtitle2" color="text.secondary">Origen</Typography>
            <Typography variant="body1">{character.origin.name}</Typography>
          </div>

          <div>
            <Typography variant="subtitle2" color="text.secondary">Ultima ubicacion conocida</Typography>
            <Typography variant="body1">{character.location.name}</Typography>
          </div>

          {character.type && (
            <div>
              <Typography variant="subtitle2" color="text.secondary">Tipo</Typography>
              <Typography variant="body1">{character.type}</Typography>
            </div>
          )}

          <div>
            <Typography variant="subtitle2" color="text.secondary">Episodios</Typography>
            <Typography variant="body1">{episodeCount} apariciones</Typography>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};