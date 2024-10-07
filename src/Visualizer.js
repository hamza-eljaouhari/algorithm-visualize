import React from 'react';
import { Box, Typography } from '@mui/material';

const boxSize = '50px';

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
    match: '#FFD700',               // Added color for match operation
    noMatch: '#FF4500',             // Added color for noMatch operation
    calculateCost: '#FF6347',       // Added color for cost calculation
    initializeCell: '#00BFFF',      // Added color for cell initialization
  };

  const renderArray = (stepData) => {
    const { arr, current, operation } = stepData;
    return (
      <Box display="flex" mt={2}>
        {arr && arr.map((value, idx) => (
          <Box
            key={idx}
            sx={{
              width: boxSize,
              height: boxSize,
              lineHeight: boxSize,
              textAlign: 'center',
              backgroundColor: current?.includes(idx) ? operationColors[operation] : '#2C2C54',
              color: 'white',
              marginRight: '5px',
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
    const size = Math.sqrt(arr.length); // assuming a square matrix for simplicity
    return (
      <Box mt={2}>
        {Array.from({ length: size }, (_, rowIndex) => (
          <Box key={rowIndex} display="flex">
            {arr.slice(rowIndex * size, (rowIndex + 1) * size).map((value, colIndex) => (
              <Box
                key={colIndex}
                sx={{
                  width: boxSize,
                  height: boxSize,
                  lineHeight: boxSize,
                  textAlign: 'center',
                  backgroundColor: current?.includes(rowIndex * size + colIndex) ? operationColors[operation] : '#2C2C54',
                  color: 'white',
                  marginRight: '5px',
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

    console.log("Step Type : ", stepType)
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
    <Box sx={{ mt: 2 }}>
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
