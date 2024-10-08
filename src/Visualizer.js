import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Visualizer({ steps, currentStep, stepType }) {
  const operationColors = {
    conditionFail: '#4B0082',
    conditionSuccess: '#32CD32',
    assignment: '#4682B4',
    visiting: '#6A5ACD', // Example color for visiting
    backtracking: '#9400D3', // Example color for backtracking
    reset: '#708090',
    final: '#FFD700',
  };

  const renderGraph = (stepData) => {
    const { nodes = [], edges = [], current, action } = stepData;

    return (
      <Box position="relative" width="100%" height="400px" sx={{ borderRadius: '8px', border: '1px solid #1e1e1e' }}>
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
              backgroundColor: current === node.label ? operationColors[action] || '#4682B4' : '#2C2C54',
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
          const startNode = nodes.find(node => node.label === edge[0]);
          const endNode = nodes.find(node => node.label === edge[1]);

          if (!startNode || !endNode) return null;

          const isHighlighted = current && (current[0] === edge[0] && current[1] === edge[1]);
          const left = `${Math.min(startNode.x, endNode.x)}%`;
          const top = `${Math.min(startNode.y, endNode.y)}%`;
          const width = `${Math.abs(endNode.x - startNode.x)}%`;
          const height = `${Math.abs(endNode.y - startNode.y)}%`;

          return (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                left,
                top,
                width,
                height,
                border: `1px solid ${isHighlighted ? operationColors[action] : '#8A2BE2'}`,
              }}
            />
          );
        })}
      </Box>
    );
  };

  const renderArray = (stepData) => {
    const { arr = [] } = stepData;
    const squareWidth = `${100 / arr.length}%`;
  
    return (
      <Box display="flex" justifyContent="center">
        {arr.map((value, idx) => (
          <Box
            key={idx}
            sx={{
              width: squareWidth,
              height: '50px',
              lineHeight: '50px',
              textAlign: 'center',
              backgroundColor: '#2C2C54',
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
    const { arr = [[]] } = stepData;
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
                  backgroundColor: '#2C2C54',
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
    return (
      <Box mt={2}>
        <Typography color="white">Tree visualization is not implemented yet.</Typography>
      </Box>
    );
  };

  const renderGrid = (stepData) => {
    const { board = [[]] } = stepData;
    const n = board.length;
    const squareWidth = `${100 / n}%`;
  
    return (
      <Box mt={2}>
        {board.map((row, rowIndex) => (
          <Box key={rowIndex} display="flex" justifyContent="center">
            {row.map((value, colIndex) => (
              <Box
                key={colIndex}
                sx={{
                  width: squareWidth,
                  height: '50px',
                  lineHeight: '50px',
                  textAlign: 'center',
                  backgroundColor: value === 1 ? '#FFD700' : '#2C2C54', // Highlight queens with a special color
                  color: 'white',
                  border: '1px solid #1e1e1e',
                }}
              >
                {value === 1 ? '♛' : ''}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    );
  };
  
  const renderStepwise = (stepData) => {
    const { a, b } = stepData;
  
    return (
      <Box display="flex" justifyContent="center" mt={2} p={2}>
        <Box
          sx={{
            minWidth: '80px',
            height: '50px',
            lineHeight: '50px',
            textAlign: 'center',
            backgroundColor: '#2C2C54',
            color: 'white',
            border: '1px solid #1e1e1e',
            marginRight: '8px',
          }}
        >
          a: {a}
        </Box>
        <Box
          sx={{
            minWidth: '80px',
            height: '50px',
            lineHeight: '50px',
            textAlign: 'center',
            backgroundColor: '#2C2C54',
            color: 'white',
            border: '1px solid #1e1e1e',
          }}
        >
          b: {b}
        </Box>
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
      case 'grid':
        return renderGrid(stepData);
      case 'stepwise':
        return renderStepwise(stepData);
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
