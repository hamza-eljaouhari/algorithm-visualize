import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function ToolbarControl({
  currentStep,
  setCurrentStep,
  algorithmSteps,
  executeAlgorithm,
}) {
  const stepCount = algorithmSteps ? algorithmSteps.length : 0;

  const handleNextStep = () => {
    if (currentStep < algorithmSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  return (
    <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
      <Button
        variant="contained"
        startIcon={<PlayArrowIcon />}
        onClick={executeAlgorithm} // Executes algorithm on "Play"
      >
        Play
      </Button>
      <IconButton
        color="primary"
        onClick={handleNextStep}
        disabled={currentStep >= stepCount}
      >
        <ArrowForwardIcon />
      </IconButton>
      <IconButton
        color="secondary"
        onClick={handleReset}
      >
        <RestartAltIcon />
      </IconButton>
    </Box>
  );
}
