import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { algorithms } from './algorithms';
import { implementations } from './implementations';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Visualizer from './Visualizer';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  backgroundColor: '#1e1e1e',
  marginLeft: `-${drawerWidth}px`,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const scrollbarStyle = {
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#333',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
};

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [algorithmSteps, setAlgorithmSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedParams, setGeneratedParams] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [code, setCode] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [currentImplementation, setAlgorithmImplementation] = useState(null);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handlePlay = () => executeAlgorithm();
  const handlePause = () => setIsPlaying(false);

  const handleNextStep = () => {
    if (currentStep < algorithmSteps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleRunAllSteps = () => setCurrentStep(algorithmSteps.length - 1);

  const handleRunVisualized = async () => {
    await executeAlgorithm();
    setAutoPlay(true);
    setIsPlaying(true);
    setCurrentStep(0);
  };

  const generateParameters = (parameters) => {
    return parameters.map(param => {
      if (!param) return null; // Handle missing parameter gracefully
  
      if (param.type === 'array') {
        return Array.from({ length: param.length }, () => Math.floor(Math.random() * (param.max - param.min + 1)) + param.min);
  
      } else if (param.type === 'sortedArray') {
        return Array.from({ length: param.length }, () => Math.floor(Math.random() * (param.max - param.min + 1)) + param.min).sort((a, b) => a - b);
  
      } else if (param.type === 'matrix') {
        const rows = Math.floor(Math.random() * (param.max - param.min + 1)) + param.min; // Random number of rows
        const cols = Math.floor(Math.random() * (param.max - param.min + 1)) + param.min; // Random number of cols
        return Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.floor(Math.random() * (param.max - param.min + 1)) + param.min));
  
      } else if (param.type === 'integer' || param.type === 'number') {
        return Math.floor(Math.random() * (param.max - param.min + 1)) + param.min;
  
      } else if (param.type === 'points') {
        return Array.from({ length: param.length }, () => [
          Math.floor(Math.random() * (param.max - param.min + 1)) + param.min,
          Math.floor(Math.random() * (param.max - param.min + 1)) + param.min
        ]);
  
      } else if (param.type === 'string' || param.type === 'pattern') {
        const length = Math.floor(Math.random() * (param.maxLength - param.minLength + 1)) + param.minLength;
        return Array.from({ length }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('') || 'a'; // Ensure it's non-empty
      } else if (param.type === 'graph') {
        const numVertices = Math.floor(Math.random() * (param.max - param.min + 1)) + param.min; // Random number of vertices
        const edges = [];
        const addedEdges = new Set(); // To prevent duplicate edges
  
        // Create random edges
        for (let i = 0; i < numVertices; i++) {
          for (let j = 0; j < Math.floor(Math.random() * numVertices); j++) {
            if (i !== j) {
              const weight = Math.floor(Math.random() * 10) + 1; // Positive weights
              edges.push([i, j, weight]); // Create directed edge
              addedEdges.add(`${i}-${j}`);
            }
          }
        }
  
        return edges;
  
      } else {
        console.error(`Unknown parameter type: ${param.type}`);
        return null;
      }
    });
  };

  const handleAlgorithmSelection = async (categoryName, algorithmName) => {
    setSelectedAlgorithm(algorithmName);
    setSelectedCategory(categoryName);

    const algorithmImplementation = implementations[categoryName]?.algorithms.find(alg => alg.name === algorithmName);

    setAlgorithmImplementation(algorithmImplementation);

    if (algorithmImplementation) {
      setAlgorithmSteps([]);
      setCurrentStep(0);
      setFinalResult(null);
      const params = generateParameters(algorithmImplementation.parameters);
      setGeneratedParams(params);
      setCode(algorithmImplementation.code || '');
    }
  };

  const updateStep = (stepData) => {
    setAlgorithmSteps((prevSteps) => [...prevSteps, stepData]);
  };

  const generateBellmanParameters = (numVertices, numEdges) => {
    const edges = [];
    const vertices = Array.from({ length: numVertices }, (_, index) => index);

    // Create edges with random weights
    const addedEdges = new Set(); // To prevent duplicate edges
    for (let i = 0; i < numEdges; i++) {
      const src = vertices[Math.floor(Math.random() * numVertices)];
      const dest = vertices[Math.floor(Math.random() * numVertices)];
      const weight = Math.floor(Math.random() * 10) + 1; // Positive weights

      // Avoid self-loops and duplicate edges
      if (src !== dest && !addedEdges.has(`${src}-${dest}`)) {
        edges.push([src, dest, weight]);
        addedEdges.add(`${src}-${dest}`);
      }
    }

    // Ensure at least one path from source to each vertex (create a tree-like structure)
    for (let i = 1; i < numVertices; i++) {
      const weight = Math.floor(Math.random() * 10) + 1;
      edges.push([0, i, weight]); // Connecting all vertices to the source (vertex 0)
    }

    return { edges, vertices };
  };

  const executeAlgorithm = async () => {
    if (!selectedAlgorithm) {
      console.error('No algorithm selected!');
      return;
    }

    const algorithmImplementation = implementations[selectedCategory]?.algorithms.find(
      (algorithm) => algorithm.name === selectedAlgorithm
    );

    if (!algorithmImplementation || !algorithmImplementation.execute) {
      console.error('No valid implementation found for the selected algorithm!');
      return;
    }

    // Generate parameters and execute the selected algorithm
    const params = generatedParams;

    const result = await algorithmImplementation.execute(...params, (stepData) => {
      updateStep({
        ...stepData,
        visualizationType: algorithmImplementation.visualization.stepType,
      });
    });

    if (result) {
      setFinalResult(result);
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (isPlaying && currentStep < algorithmSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 500);
      return () => clearTimeout(timer);
    } else if (isPlaying && autoPlay && currentStep >= algorithmSteps.length - 1) {
      setIsPlaying(false); // Stop when reaching the end
      setAutoPlay(false); // Reset autoplay mode
    }
  }, [isPlaying, currentStep, algorithmSteps, autoPlay]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Algorithm Visualizer
          </Typography>
        </Toolbar>
      </AppBarStyled>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#faf0e6',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ backgroundColor: 'white' }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {algorithms.map((category, index) => (
          <Accordion
            key={index}
            expanded={expanded === category.title}
            onChange={handleAccordionChange(category.title)}
            sx={{
              backgroundColor: '#faf0e6',
              boxShadow: 'none',
              '&:not(:last-child)': {
                marginBottom: '0px',
              },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${category.title}-content`} id={`${category.title}-header`}>
              <Typography>{category.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                {category.algorithms.map((algorithmName, idx) => (
                  <ListItem button="true" key={idx} onClick={() => handleAlgorithmSelection(category.title, algorithmName)}>
                    <ListItemText primary={algorithmName} />
                  </ListItem>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Toolbar sx={{ backgroundColor: '#fff', justifyContent: 'flex-start', pl: 2 }}>
          <IconButton color="primary" onClick={handlePreviousStep} sx={{ color: '#d32f2f' }}>
            <SkipPreviousIcon />
            <Typography variant="caption">Previous</Typography>
          </IconButton>
          {isPlaying ? (
            <IconButton color="primary" onClick={handlePause} sx={{ color: '#0288d1' }}>
              <PauseIcon />
              <Typography variant="caption">Pause</Typography>
            </IconButton>
          ) : (
            <IconButton color="primary" onClick={handlePlay} sx={{ color: '#388e3c' }}>
              <PlayArrowIcon />
              <Typography variant="caption">Play</Typography>
            </IconButton>
          )}
          <IconButton color="primary" onClick={handleNextStep} sx={{ color: '#d32f2f' }}>
            <SkipNextIcon />
            <Typography variant="caption">Next</Typography>
          </IconButton>
          <IconButton color="primary" onClick={handleRunAllSteps} sx={{ color: '#ffa000' }}>
            <FastForwardIcon />
            <Typography variant="caption">Run All</Typography>
          </IconButton>
          <IconButton color="primary" onClick={handleRunVisualized} sx={{ color: '#7b1fa2' }}>
            <PlayCircleFilledIcon />
            <Typography variant="caption">Visualize</Typography>
          </IconButton>
        </Toolbar>
        <Box sx={{ display: 'flex', height: 'calc(100vh - 64px - 56px)', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', height: "100" }}>
              <Card sx={{ height: 'calc(33vh - (64px + 56px) / 3)', overflowY: 'auto', backgroundColor: '#333', color: '#ddd', ...scrollbarStyle }}>
                <CardContent>
                  <Typography variant="h6">Initial Parameters</Typography>
                  <pre>{JSON.stringify(generatedParams, null, 2)}</pre>
                </CardContent>
              </Card>
              <Card sx={{ height: 'calc(33vh - (64px + 56px) / 3)', overflowY: 'auto', backgroundColor: '#333', color: '#ddd', ...scrollbarStyle, border: '1px solid black' }}>
                <Visualizer steps={algorithmSteps} currentStep={currentStep} stepType={currentImplementation?.visualization.stepType} />
              </Card>
              <Card sx={{ height: 'calc(33vh - (64px + 56px) / 3)', overflowY: 'auto', backgroundColor: '#333', color: '#ddd', ...scrollbarStyle }}>
                <CardContent>
                  <Typography variant="subtitle1">Final Result:</Typography>
                  <pre>{JSON.stringify(finalResult, null, 2)}</pre>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{
              width: '50%',
              position: 'sticky',
              top: 0,
              height: '50vh',
              overflowY: 'auto',
              ...scrollbarStyle
            }}>
              <TextField
                multiline
                fullWidth
                variant="outlined"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                sx={{ height: '100%', color: '#ddd', fontFamily: 'monospace', ...scrollbarStyle }}
                inputProps={{
                  style: { color: '#ddd', backgroundColor: '#333', padding: '16px', border: 'none' }
                }}
              />
            </Box>
          </Box>
        </Box>
      </Main>
    </Box>
  );
}
