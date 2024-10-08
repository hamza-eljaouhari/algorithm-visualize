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

const predefinedGraphs = [
  [
    [1, 2],     // Graph 1 - Node 0 connects to Node 1 and Node 2
    [0, 3, 4],  // Node 1 connects to Node 0, Node 3, and Node 4
    [0, 5],     // Node 2 connects to Node 0 and Node 5
    [1, 6],     // Node 3 connects to Node 1 and Node 6
    [1, 5, 7],  // Node 4 connects to Node 1, Node 5, and Node 7
    [2, 4, 7],  // Node 5 connects to Node 2, Node 4, and Node 7
    [3, 7],     // Node 6 connects to Node 3 and Node 7
    [4, 5, 6]   // Node 7 connects to Node 4, Node 5, and Node 6
  ],
  [
    [1],        // Graph 2 - Node 0 connects to Node 1
    [0, 2, 3],  // Node 1 connects to Node 0, Node 2, and Node 3
    [1, 4],     // Node 2 connects to Node 1 and Node 4
    [1, 4, 5],  // Node 3 connects to Node 1, Node 4, and Node 5
    [2, 3, 6],  // Node 4 connects to Node 2, Node 3, and Node 6
    [3, 6],     // Node 5 connects to Node 3 and Node 6
    [4, 5, 7],  // Node 6 connects to Node 4, Node 5, and Node 7
    [6]         // Node 7 connects to Node 6
  ],
  [
    [1, 2, 3],  // Graph 3 - Node 0 connects to Node 1, Node 2, and Node 3
    [0, 4],     // Node 1 connects to Node 0 and Node 4
    [0, 5],     // Node 2 connects to Node 0 and Node 5
    [0, 6],     // Node 3 connects to Node 0 and Node 6
    [1, 7],     // Node 4 connects to Node 1 and Node 7
    [2, 7],     // Node 5 connects to Node 2 and Node 7
    [3, 7],     // Node 6 connects to Node 3 and Node 7
    [4, 5, 6]   // Node 7 connects to Node 4, Node 5, and Node 6
  ]
];

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
    height: '8px'
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#333',
    borderLeft: '1px solid black'

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

  console.log("Algorithm Steps : ", algorithmSteps);

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

  const generateParameters = (parameters, algorithmName) => {
    return parameters.map(param => {
      if (!param) return null;

      const {
        type,
        length = 5,
        min = 1,
        max = 10,
        numRows = 1,
        numCols = 1,
        depth = null, // New option for 3D matrices
        minLength = 1,
        maxLength = 10,
        maxFreq = 10,
        minFreq = 1,
        numVertices = 5
      } = param;

      // Special condition for Simulated Annealing algorithm
      if (algorithmName === 'Simulated Annealing') {
        switch (type) {
          case 'object':
            // Generate an initial state (e.g., an array of random floats)
            return Array.from({ length: 5 }, () => Math.random() * 100); // Example for a state with 5 variables
          case 'float':
            if (param.name === 'temperature') {
              return Math.random() * 99 + 1; // Random float between 1 and 100
            } else if (param.name === 'coolingRate') {
              return Math.random() * 0.99 + 0.01; // Random float between 0.01 and 1
            }
            break;
          // Add any other necessary types for Simulated Annealing here
        }
      }

      // Special condition for Genetic Algorithms
      if (algorithmName === 'Genetic Algorithms') {
        switch (type) {
          case 'array':
            // Generate an array of random individuals
            return Array.from({ length }, () =>
              Array.from({ length: 5 }, () => Math.random()) // Example for an individual with 5 genes
            );
          case 'integer':
            return Math.floor(Math.random() * (max - min + 1)) + min; // Random integer
          case 'float':
            return Math.random(); // Random float between 0 and 1
          case 'population':
            return Array.from({ length: 10 }, () =>
              Array.from({ length: 5 }, () => Math.random()) // Example population of individuals
            );
          case 'mutationRate':
            return Math.random(); // Random mutation rate between 0 and 1
          case 'generations':
            return Math.floor(Math.random() * (max - min + 1)) + min; // Random number of generations
        }
      }
      // Existing logic for other parameter types
      if (type === 'array') {
        return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
      } else if (type === 'sortedArray') {
        return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min).sort((a, b) => a - b);
      } else if (type === 'matrix') {
        if (depth) {
          return Array.from({ length: depth }, () =>
            Array.from({ length: numRows }, () =>
              Array.from({ length: numCols }, () => Math.floor(Math.random() * (max - min + 1)) + min)
            )
          );
        } else {
          return Array.from({ length: numRows }, () =>
            Array.from({ length: numCols }, () => Math.floor(Math.random() * (max - min + 1)) + min)
          );
        }
      } else if (type === 'integer' || type === 'number') {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      } else if (type === 'points') {
        return Array.from({ length }, () => [
          Math.floor(Math.random() * (max - min + 1)) + min,
          Math.floor(Math.random() * (max - min + 1)) + min
        ]);
      } else if (type === 'string' || type === 'pattern') {
        const strLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
        return Array.from({ length: strLength }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('');
      } else if (type === 'charFreqArray') {
        return Array.from({ length }, () => {
          const char = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
          const freq = Math.floor(Math.random() * (maxFreq - minFreq + 1)) + minFreq;
          return { char, freq };
        });
      } else if (type === 'adjacencyList' || type === 'graph') {
        const randomGraph = predefinedGraphs[Math.floor(Math.random() * predefinedGraphs.length)];
        return randomGraph;
      } else if (type === 'floydWarshallGraph') {
        const predefinedInputs = [
          [
            [0, 3, Infinity, 5],
            [2, 0, Infinity, 4],
            [Infinity, 1, 0, Infinity],
            [Infinity, Infinity, 2, 0]
          ],
          [
            [0, 1, 4, Infinity],
            [Infinity, 0, 2, 3],
            [Infinity, Infinity, 0, 5],
            [Infinity, Infinity, Infinity, 0]
          ],
          [
            [0, 10, Infinity, Infinity, 3],
            [Infinity, 0, 5, Infinity, Infinity],
            [Infinity, Infinity, 0, 7, 1],
            [Infinity, Infinity, Infinity, 0, 2],
            [Infinity, Infinity, Infinity, Infinity, 0]
          ]
        ];

        const chosenInput = predefinedInputs[Math.floor(Math.random() * predefinedInputs.length)];
        return chosenInput;
      } else {
        console.error(`Unknown parameter type: ${type}`);
        return null;
      }
    });
  };

  const handleAlgorithmSelection = async (categoryName, algorithmName) => {
    // Clear the steps when changing algorithms
    setAlgorithmSteps([]);  // Clear previous algorithm steps
    setCurrentStep(0);      // Reset current step
    setFinalResult(null);   // Clear final result
    setCode('');            // Clear code

    setSelectedAlgorithm(algorithmName);
    setSelectedCategory(categoryName);

    const algorithmImplementation = implementations[categoryName]?.algorithms.find(alg => alg.name === algorithmName);
    setAlgorithmImplementation(algorithmImplementation);

    if (algorithmImplementation) {
      const params = generateParameters(algorithmImplementation.parameters, algorithmName);
      setGeneratedParams(params);
      setCode(algorithmImplementation.code || '');
    }
  };

  const updateStep = (stepData) => {
    setAlgorithmSteps((prevSteps) => [...prevSteps, stepData]);
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

    let result = [];

    if (params.length > 0) {
      result = await algorithmImplementation.execute(...params, (stepData) => {
        updateStep({
          ...stepData
        });
      });
    } else {
      result = await algorithmImplementation.execute((stepData) => {
        updateStep({
          ...stepData
        });
      })
    }

    setFinalResult(result);
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
              <Card sx={{ height: 'calc(33vh - (64px + 56px) / 3)', overflowY: 'auto', overflowX: 'auto', backgroundColor: '#333', color: '#ddd', ...scrollbarStyle, border: '1px solid black' }}>
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
