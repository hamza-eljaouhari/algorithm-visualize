import React from 'react';
import { Box, Typography } from '@mui/material';

const boxSize = '50px'; // Medium size for the array element boxes

export default function Visualizer({ steps, currentStep }) {
  if (steps.length === 0 || currentStep >= steps.length) {
    return (
      <Box sx={{ ml: 2, textAlign: 'center' }}>
        <Typography variant="subtitle1">No visualization available.</Typography>
      </Box>
    );
  }

  const { arr, current, operation } = steps[currentStep];

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
    final: 'lightgreen',
  };

  const renderArray = () => (
    arr ? (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
        {arr.map((value, index) => (
          <Box
            key={index}
            sx={{
              width: boxSize,
              height: boxSize,
              lineHeight: boxSize,
              textAlign: 'center',
              backgroundColor: current?.includes(index) ? operationColors[operation] || 'lightgray' : 'lightgray',
              margin: '0 5px',
              border: '1px solid black',
              borderRadius: '4px',
              opacity: current?.includes(index) && operation === 'final' ? 0.5 : 1,
            }}
          >
            {value}
          </Box>
        ))}
      </Box>
    ) : (
      <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>No array data to display</Typography>
    )
  );

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 1 }}>Array Visualization</Typography>
      {renderArray()}
    </Box>
  );
}
