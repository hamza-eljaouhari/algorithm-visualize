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
    const squareWidth = `${100 / arr.length}%`;

    return (
      <Box display="flex" justifyContent="center">
        {arr && arr.map((value, idx) => (
          <Box
            key={idx}
            sx={{
              width: squareWidth,
              height: '50px',
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
    const numCols = arr[0]?.length || 1;
    const squareWidth = `${100 / numCols}%`;

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

  const renderGraph = (stepData) => {
    const { nodes = [], edges = [], current, operation } = stepData;
  
    return (
      <Box position="relative" width="100%" height="400px" sx={{  borderRadius: '8px' }}>
        {/* Render nodes */}
        {nodes.map((node, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: current?.includes(index) ? operationColors[operation] : '#4682B4',
              textAlign: 'center',
              lineHeight: '30px',
              color: 'white',
              border: '2px solid #1e1e1e',
            }}
          >
            {node.label}
          </Box>
        ))}
        {/* Render edges */}
        {edges.map((edge, index) => {
          const startNode = nodes[edge[0]];
          const endNode = nodes[edge[1]];
  
          // If the start or end node is not found, skip rendering this edge
          if (!startNode || !endNode) return null;
  
          const isHighlighted = current && (current[0] === edge[0] && current[1] === edge[1]);
  
          return (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                left: `${Math.min(startNode.x, endNode.x)}%`,
                top: `${Math.min(startNode.y, endNode.y)}%`,
                width: `${Math.abs(endNode.x - startNode.x)}%`,
                height: `${Math.abs(endNode.y - startNode.y)}%`,
                border: `1px solid ${isHighlighted ? operationColors[operation] : '#8A2BE2'}`,
              }}
            />
          );
        })}
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
      case 'graph':
        return renderGraph(stepData);
      default:
        return null;
    }
  };

  return (
    <Box sx={{ mt: 2, overflow: 'hidden' }}>
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
