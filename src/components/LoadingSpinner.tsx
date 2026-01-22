import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Cargando personajes...
      </Typography>
    </Box>
  );
};