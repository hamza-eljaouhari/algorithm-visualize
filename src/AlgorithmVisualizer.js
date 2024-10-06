import React from 'react';
import { Box } from '@mui/material';

const operationColors = {
  conditionFail: 'red',
  conditionSuccess: 'green',
  assignment: 'blue',
  swap: 'orange',
  increment: 'purple',
  decrement: 'pink',
  reset: 'gray',
  initialize: 'lightblue',
  nullify: 'lightcoral',
  undefine: 'lightyellow',
  final: 'lightgreen', // Color for final result display
};

export default function AlgorithmVisualizer({ steps, currentStep }) {
  if (steps.length === 0 || currentStep >= steps.length) {
    return <div>No visualization available.</div>;
  }

  const { arr, current, operation, final } = steps[currentStep];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {arr && arr.map((value, index) => (
        <Box
          key={index}
          sx={{
            width: '50px',
            height: '50px',
            lineHeight: '50px',
            textAlign: 'center',
            backgroundColor: current?.includes(index) 
              ? operationColors[operation] || 'lightgray' // Default color
              : 'lightgray',
            margin: '0 5px',
            border: '1px solid black',
            opacity: final ? 0.5 : 1, // Dim the boxes if it's a final result step
          }}
        >
          {value}
        </Box>
      ))}
    </Box>
  );
}
