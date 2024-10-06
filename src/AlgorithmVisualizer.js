import React from 'react';
import { Box } from '@mui/material';

export default function AlgorithmVisualizer({ steps, currentStep }) {
  if (steps.length === 0 || currentStep >= steps.length) {
    return <div>No visualization available.</div>;
  }

  const { arr, current } = steps[currentStep];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {arr.map((value, index) => (
        <Box
          key={index}
          sx={{
            width: '50px',
            height: '50px',
            lineHeight: '50px',
            textAlign: 'center',
            backgroundColor: current?.includes(index) ? 'yellow' : 'lightgray',
            margin: '0 5px',
            border: '1px solid black',
          }}
        >
          {value}
        </Box>
      ))}
    </Box>
  );
}
