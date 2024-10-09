import React, { useState, useEffect } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';

export default function Visualizer({ steps, currentStep, stepType }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [searchStep, setSearchStep] = useState('');
  const [displayedSteps, setDisplayedSteps] = useState([]);
  const [error, setError] = useState(false);

  const operationColors = {
    conditionFail: '#4B0082',
    conditionSuccess: '#32CD32',
    assignment: '#4682B4',
    visiting: '#6A5ACD',
    backtracking: '#9400D3',
    reset: '#708090',
    final: '#FFD700',
  };

  useEffect(() => {
    if (steps.length > 0) {
      setDisplayedSteps(steps.slice(0, 20));
    } else {
      setDisplayedSteps([]);
    }
  }, [steps]);

  const handleOpenModal = (content) => {
    setModalContent(JSON.stringify(content, null, 2));
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchStep(value);

    if (value === '') {
      setError(false);
      setDisplayedSteps(steps.slice(0, 20));
    } else {
      const stepNum = parseInt(value, 10);
      if (!isNaN(stepNum) && stepNum >= 1 && stepNum <= steps.length) {
        setError(false);
        const start = Math.max(0, stepNum - 6);
        const end = Math.min(steps.length, stepNum + 4);
        setDisplayedSteps(steps.slice(start, end));
      } else {
        setError(true);
        setDisplayedSteps([]);
      }
    }
  };

  const renderArray = (stepData) => {
    const { arr = [], index, action } = stepData;
    return (
      <Box display="flex" whiteSpace="nowrap">
        {arr.map((value, idx) => (
          <Box
            key={idx}
            sx={{
              width: '50px',
              height: '50px',
              lineHeight: '50px',
              textAlign: 'center',
              backgroundColor: index === idx ? operationColors[action] || '#4682B4' : '#2C2C54',
              color: 'white',
              border: '1px solid #1e1e1e',
            }}
          >
            {value !== undefined && value !== null ? value : ''}
          </Box>
        ))}
      </Box>
    );
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter' || event.type === 'blur') {
      const stepNum = parseInt(searchStep, 10);
      if (!isNaN(stepNum) && stepNum >= 1 && stepNum <= steps.length) {
        const start = Math.max(0, stepNum - 6);
        const end = Math.min(steps.length, stepNum + 4);
        setDisplayedSteps(steps.slice(start, end));
      } else {
        setDisplayedSteps([]);
        setError(true);
      }
    }
  };

  const renderMatrix = (stepData) => {
    const { arr = [[]], action, current } = stepData;

    if (!Array.isArray(arr)) {
      console.error("arr is not a 2D array:", arr);
      return null;
    }

    return (
      <Box mt={2}>
        {arr.map((row, rowIndex) => (
          <Box key={rowIndex} display="flex" whiteSpace="nowrap">
            {row.map((value, colIndex) => (
              <Box
                key={colIndex}
                sx={{
                  width: '50px', // Fixed width for each cell
                  height: '50px',
                  lineHeight: '50px',
                  textAlign: 'center',
                  backgroundColor:
                    current &&
                      current[0] === rowIndex &&
                      current[1] === colIndex
                      ? operationColors[action] || '#4682B4'
                      : '#2C2C54',
                  color: 'white',
                  border: '1px solid #1e1e1e',
                }}
              >
                {Array.isArray(arr[0]) ? JSON.stringify(value) : value}
              </Box>
            ))}
          </Box>
        ))}
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
    <Box>
      <Box
        sx={{
          position: 'sticky',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          height: '60px',
          padding: '0 5px',
          borderBottom: '1px solid black',
        }}
      >
        <Typography variant="subtitle1" sx={{ textAlign: 'left', color: 'white' }}>
          Visualization
        </Typography>
        <TextField
          variant="outlined"
          label="Search Step"
          value={searchStep}
          size="small"
          onChange={handleSearchChange}
          sx={{
            ml: 'auto',
            '.MuiFormLabel-root': { color: 'white' },
            '.MuiOutlinedInput-root fieldset': { color: 'white !important' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' },
              '& input': { color: 'white' },
            },
          }}
        />
      </Box>

      <Box sx={{ mt: '60px' }}> {/* Push content down to avoid overlap with header */}
        {displayedSteps.length > 0 && (
          <Typography variant="h6" sx={{ textAlign: 'left', mb: 2 }}>
            {`Step #${steps.indexOf(displayedSteps[0]) + 1} to Step #${steps.indexOf(displayedSteps[displayedSteps.length - 1]) + 1}`}
          </Typography>
        )}

        {displayedSteps.map((stepData, index) => (
          <Box key={index}>{renderArray(stepData)}</Box>
        ))}

        {displayedSteps.length === 0 && (
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>No steps to display</Typography>
        )}

        <Dialog open={modalOpen} onClose={handleCloseModal}>
          <DialogTitle>Array Content</DialogTitle>
          <DialogContent>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{modalContent}</pre>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}