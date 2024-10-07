import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Visualizer({ steps, currentStep, stepType }) {
  const operationColors = {
    conditionFail: '#4B0082',
    conditionSuccess: '#32CD32',
    assignment: '#4682B4',
    swap: '#6A5ACD',
    increment: '#8A2BE2',
    decrement: '#9400D3',
    reset: '#708090',
    initialize: '#483D8B',
    nullify: '#8B008B',
    undefine: '#7B68EE',
    final: '#4B0082',
    match: '#FFD700',
    noMatch: '#FF4500',
    calculateCost: '#FF6347',
    initializeCell: '#00BFFF',
  };

  const renderArray = (stepData) => {
    const { arr, current, operation } = stepData;
    const squareWidth = `${100 / arr.length}%`; // Calculate width based on number of squares

    return (
      <Box display="flex" justifyContent="center">
        {arr && arr.map((value, idx) => (
          <Box
            key={idx}
            sx={{
              width: squareWidth, // Set width as a percentage
              height: '50px', // Keep the height fixed
              lineHeight: '50px',
              textAlign: 'center',
              backgroundColor: current?.includes(idx) ? operationColors[operation] : '#2C2C54',
              color: 'white',
              border: '1px solid #1e1e1e',
            }}
          >
            {value}
          </Box>
        ))}
      </Box>
    );
  };

  const renderMatrix = (stepData) => {
    const { arr, current, operation } = stepData;
    
    // Assume arr is a 2D array
    const numRows = arr.length;
    const numCols = arr[0].length;
    const squareWidth = `${100 / numCols}%`; // Calculate width for matrix cells

    return (
      <Box mt={2}>
        {arr.map((row, rowIndex) => (
          <Box key={rowIndex} display="flex" justifyContent="center">
            {row.map((value, colIndex) => (
              <Box
                key={colIndex}
                sx={{
                  width: squareWidth,
                  height: '50px',
                  lineHeight: '50px',
                  textAlign: 'center',
                  backgroundColor: current?.includes(rowIndex * numCols + colIndex) ? operationColors[operation] : '#2C2C54',
                  color: 'white',
                  border: '1px solid #1e1e1e',
                }}
              >
                {value}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    );
  };

  const renderTree = (stepData) => {
    const { current } = stepData;
    return (
      <Box mt={2}>
        <Typography color="white">
          {current ? `Current recursive call for value: ${current[0]}` : 'No data'}
        </Typography>
      </Box>
    );
  };

  const renderVisualization = (stepData) => {
    switch (stepType) {
      case 'array':
        return renderArray(stepData);
      case 'matrix':
        return renderMatrix(stepData);
      case 'tree':
        return renderTree(stepData);
      default:
        return null;
    }
  };

  return (
    <Box sx={{ mt: 2, overflow: 'hidden' }}> {/* Set overflow hidden on parent */}
      <Typography variant="subtitle1" sx={{ textAlign: 'left', mb: 1, ml: 2 }}>Visualization</Typography>
      {steps.slice(0, currentStep + 1).map((stepData, index) => (
        <Box key={index}>{renderVisualization(stepData)}</Box>
      ))}
      {currentStep >= steps.length && (
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>No more steps to display</Typography>
      )}
    </Box>
  );
}