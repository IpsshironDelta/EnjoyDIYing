import * as React from 'react';
import Box from '@mui/material/Box';

export default function BoxSx() {
  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        backgroundColor: '#1976d2',
        '&:hover': {
          backgroundColor: '#64b5f6',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >test
    </Box>
  );
}