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
  final: 'lightgreen',
};

export default function AlgorithmVisualizer({ steps, currentStep, outputType }) {
  if (steps.length === 0 || currentStep >= steps.length) {
    return <div>No visualization available.</div>;
  }

  const { arr, current, operation, final } = steps[currentStep];

  const renderArray = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {arr && arr.map((value, index) => (
        <Box
          key={index}
          sx={{
            width: '50px',
            height: '50px',
            lineHeight: '50px',
            textAlign: 'center',
            backgroundColor: current?.includes(index) ? operationColors[operation] || 'lightgray' : 'lightgray',
            margin: '0 5px',
            border: '1px solid black',
            opacity: final ? 0.5 : 1,
          }}
        >
          {value}
        </Box>
      ))}
    </Box>
  );

  const renderPoints = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {arr && arr.map(([x, y], index) => (
        <Box
          key={index}
          sx={{
            width: '10px',
            height: '10px',
            backgroundColor: current?.includes(index) ? operationColors[operation] || 'lightgray' : 'lightgray',
            position: 'absolute',
            top: `${y}%`,
            left: `${x}%`,
          }}
        />
      ))}
    </Box>
  );

  switch (outputType) {
    case 'array':
      return renderArray();
    case 'points':
      return renderPoints();
    default:
      return <div>Unsupported visualization type.</div>;
  }
}
