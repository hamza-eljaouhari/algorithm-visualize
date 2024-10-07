import React from 'react';
import { Box, Typography } from '@mui/material';

const boxSize = '50px'; // Medium size for the array element boxes

export default function Visualizer({ steps, currentStep }) {
  const operationColors = {
    conditionFail: '#4B0082',       // Dark Indigo for failure conditions
    conditionSuccess: '#32CD32',    // Lime Green for success conditions
    assignment: '#4682B4',          // Steel Blue for assignment
    swap: '#6A5ACD',                // Slate Blue for swap operations
    increment: '#8A2BE2',           // Blue Violet for increment
    decrement: '#9400D3',           // Dark Violet for decrement
    reset: '#708090',               // Slate Gray for reset
    initialize: '#483D8B',          // Dark Slate Blue for initialization
    nullify: '#8B008B',             // Dark Magenta for nullify
    undefine: '#7B68EE',            // Medium Slate Blue for undefined
    final: '#4B0082',               // Dark Indigo for final
  };

  const renderArray = (stepData, index) => {
    const { arr, current, operation } = stepData;

    return (
      <Box
        key={index}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          mt: 2,
          borderBottom: '1px solid #444', // Divider between steps
          pb: 1,
          ml: 2
        }}
      >
        {arr ? arr.map((value, idx) => (
          <Box
            key={idx}
            sx={{
              width: boxSize,
              height: boxSize,
              lineHeight: boxSize,
              textAlign: 'center',
              backgroundColor: current?.includes(idx) ? operationColors[operation] || '#2C2C54' : '#2C2C54',
              color: 'white', // White text for readability
              marginRight: '5px',
              border: '1px solid #1e1e1e', // Subtle dark border
              borderRadius: '0px', // No border radius for a sharp look
            }}
          >
            {value}
          </Box>
        )) : (
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>No array data to display</Typography>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 1 }}>Array Visualization</Typography>
      {steps.slice(0, currentStep + 1).map((stepData, index) => renderArray(stepData, index))}
      {currentStep >= steps.length && (
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>No more steps to display</Typography>
      )}
    </Box>
  );
}
