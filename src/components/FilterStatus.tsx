import { Box, Chip, Typography, Stack } from '@mui/material';
import { type StatusFilter } from '../types';

interface FilterStatusProps {
  value: StatusFilter;
  onChange: (status: StatusFilter) => void;
}

// Doy color a los filtros con material y encajo en la interfaz
const statuses = [
  { value: 'all' as StatusFilter, label: 'Todos', color: 'primary' as const },
  { value: 'Alive' as StatusFilter, label: 'Vivos', color: 'success' as const },
  { value: 'Dead' as StatusFilter, label: 'Muertos', color: 'error' as const },
  { value: 'unknown' as StatusFilter, label: 'Desconocido', color: 'default' as const },
];

export const FilterStatus = ({ value, onChange }: FilterStatusProps) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5 }}>
        Filtrar por estado:
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {statuses.map((status) => {
          const isSelected = value === status.value;
          return (
            <Chip
              key={status.value}
              label={status.label}
              onClick={() => onChange(status.value)}
              color={status.color}
              variant={isSelected ? 'filled' : 'outlined'}
              sx={{ fontWeight: isSelected ? 'bold' : 'normal', cursor: 'pointer' }}
            />
          );
        })}
      </Stack>
    </Box>
  );
};