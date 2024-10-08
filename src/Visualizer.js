import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Visualizer({ steps, currentStep, stepType }) {
  const operationColors = {
    conditionFail: '#4B0082',
    conditionSuccess: '#32CD32',
    assignment: '#4682B4',
    visiting: '#6A5ACD',
    backtracking: '#9400D3',
    reset: '#708090',
    final: '#FFD700',
  };

  const renderArray = (stepData) => {
    const { arr = [], action, current } = stepData;
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
              backgroundColor: current === idx ? operationColors[action] || '#4682B4' : '#2C2C54',
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
    const {
      matrices = [],
      result = [],
      operation,
      arr = [[]],
      action,
      current,
    } = stepData;
  
    // Use matrices if available; otherwise, fall back on arr
    const matrixItems = matrices.length ? matrices : [arr];
    const displayResult = matrices.length ? result : [];
  
    return (
      <Box mt={2}>
        {/* Display Operation Heading if available */}
        <Box display="flex" justifyContent="center" alignItems="flex-start" gap={4}>
          {/* Render each matrix in the matrices array or just the arr */}
          {matrixItems.map((matrix, matrixIndex) => {
            const numCols = matrix[0]?.length || 1;
            const squareWidth = `${100 / numCols}%`;
  
            return (
              <Box key={matrixIndex} mb={2}>
                {matrix.map((row, rowIndex) => (
                  <Box key={rowIndex} display="flex" justifyContent="center">
                    {row.map((value, colIndex) => (
                      <Box
                        key={colIndex}
                        sx={{
                          width: squareWidth,
                          height: '50px',
                          lineHeight: '50px',
                          textAlign: 'center',
                          backgroundColor:
                            current &&
                            current[0] === rowIndex &&
                            current[1] === colIndex
                              ? operationColors[action || operation] || '#4682B4'
                              : '#2C2C54',
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
          })}
        </Box>
  
        {/* Display the result matrix if present */}
        {displayResult.length > 0 && (
          <Box mt={2} display="flex" justifyContent="center" alignItems="flex-start">
            <Box>
              {displayResult.map((row, rowIndex) => (
                <Box key={rowIndex} display="flex" justifyContent="center">
                  {row.map((value, colIndex) => (
                    <Box
                      key={colIndex}
                      sx={{
                        width: `${100 / row.length}%`,
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
          </Box>
        )}
      </Box>
    );
  };
  
  const renderGrid = (stepData) => {
    const { board = [[]], action, current } = stepData;
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
                  backgroundColor: current && current[0] === rowIndex && current[1] === colIndex ? operationColors[action] : '#2C2C54',
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

  const renderGraph = (stepData) => {
    const { nodes = [], edges = [], current, action } = stepData;

    return (
      <Box position="relative" width="100%" height="400px" sx={{ borderRadius: '8px', border: '1px solid #1e1e1e' }}>
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
              fontSize: '14px'
            }}
          >
            {node.label}
          </Box>
        ))}

        {edges.map((edge, index) => {
          const startNode = nodes.find(node => node.label === edge[0]);
          const endNode = nodes.find(node => node.label === edge[1]);

          if (!startNode || !endNode) return null;

          const x1 = `${startNode.x}%`;
          const y1 = `${startNode.y}%`;
          const x2 = `${endNode.x}%`;
          const y2 = `${endNode.y}%`;

          const isHighlighted = current && current[0] === edge[0] && current[1] === edge[1];

          return (
            <svg key={index} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isHighlighted ? operationColors[action] : '#8A2BE2'}
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            </svg>
          );
        })}

        <svg style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0 }}>
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="0" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="#8A2BE2" />
            </marker>
          </defs>
        </svg>
      </Box>
    );
  };

  const renderStepwise = (stepData) => {
    const stepEntries = Object.entries(stepData);

    return (
      <Box display="flex" justifyContent="center" mt={2} p={2}>
        {stepEntries.map(([key, value], index) => (
          <Box
            key={index}
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
            {key}: {value}
          </Box>
        ))}
      </Box>
    );
  };

  const renderTree = (stepData) => {
    const { nodes = [], edges = [] } = stepData;
    const levelMap = {};

    const organizeLevels = (node, level = 0) => {
      if (!levelMap[level]) levelMap[level] = [];
      levelMap[level].push(node);

      node.children?.forEach(childNode => {
        organizeLevels(nodes.find(n => n.id === childNode), level + 1);
      });
    };

    if (nodes.length > 0) {
      organizeLevels(nodes[0]);
    }

    return (
      <Box position="relative" width="100%" sx={{ padding: '20px' }}>
        {Object.keys(levelMap).map(level => (
          <Box key={level} display="flex" justifyContent="center" mb={4}>
            {levelMap[level].map((node) => (
              <Box
                key={node.id}
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#4682B4',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #1e1e1e',
                  mx: 2
                }}
              >
                {node.label}
              </Box>
            ))}
          </Box>
        ))}

        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {edges.map((edge, index) => {
            const startNode = nodes.find(n => n.id === edge[0]);
            const endNode = nodes.find(n => n.id === edge[1]);

            if (!startNode || !endNode) return null;

            const startX = `${(startNode.level + 1) * 50}%`;
            const startY = `${(startNode.index + 1) * 20}%`;
            const endX = `${(endNode.level + 1) * 50}%`;
            const endY = `${(endNode.index + 1) * 20}%`;

            return (
              <line
                key={index}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="#8A2BE2"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </Box>
    );
  };

  const renderVisualization = (stepData) => {
    switch (stepType) {
      case 'array':
        return renderArray(stepData);
      case 'matrix':
        return renderMatrix(stepData);
      case 'graph':
        return renderGraph(stepData);
      case 'grid':
        return renderGrid(stepData);
      case 'stepwise':
        return renderStepwise(stepData);
      case 'tree':
        return renderTree(stepData);
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
