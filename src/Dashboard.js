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
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ToolbarControl from './ToolbarControl';
import AlgorithmVisualizer from './AlgorithmVisualizer';
import { algorithms } from './algorithms';
import { implementations } from './implementations';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
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

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [algorithmSteps, setAlgorithmSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedParams, setGeneratedParams] = useState([]); // Generated parameters
  const [expanded, setExpanded] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Function to generate random arrays or matrices
  const generateParameters = (parameters) => {
    return parameters.map(param => {
      if (param.type === 'array') {
        return Array.from({ length: param.length }, () => Math.floor(Math.random() * (param.max - param.min + 1)) + param.min);
      } else if (param.type === 'matrix') {
        const [rows, cols] = param.size;
        return Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.floor(Math.random() * (param.max - param.min + 1)) + param.min));
      } else if (param.type === 'integer') {
        return Math.floor(Math.random() * (param.max - param.min + 1)) + param.min;
      }
      return null;
    });
  };

  const handleAlgorithmSelection = async (categoryName, algorithmName) => {
    setSelectedAlgorithm(algorithmName);
    setSelectedCategory(categoryName);

    const algorithmImplementation = implementations[categoryName]?.algorithms.find(alg => alg.name === algorithmName);

    if (algorithmImplementation) {
      setAlgorithmSteps([]); // Reset steps before execution
      setCurrentStep(0);

      // Generate parameters based on algorithm's parameter definition
      const params = generateParameters(algorithmImplementation.parameters);
      setGeneratedParams(params); // Store the generated parameters
    }
  };

  // Define the updateStep function to handle updates
  const updateStep = (stepData) => {
    setAlgorithmSteps((prevSteps) => [...prevSteps, stepData]);
  };

  const executeAlgorithm = async () => {
    if (!selectedAlgorithm) {
      console.error('No algorithm selected!');
      return;
    }

    const algorithmImplementation = implementations[selectedCategory]?.algorithms.find((algorithm) => algorithm.name === selectedAlgorithm);

    if (!algorithmImplementation || !algorithmImplementation.execute) {
      console.error('No valid implementation found for the selected algorithm!');
      return;
    }

    // Execute the algorithm with generated parameters
    await algorithmImplementation.execute(...generatedParams, updateStep);

    console.log('Algorithms Steps :', algorithmSteps);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Effect to display algorithm steps over time
  useEffect(() => {
    if (currentStep < algorithmSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 700); // Set interval to 700ms

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [currentStep, algorithmSteps]);

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
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {algorithms.map((category, index) => (
          <Accordion key={index} expanded={expanded === category.title} onChange={handleAccordionChange(category.title)}>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ width: '50%', paddingRight: 2 }}>
            <Typography variant="h6">Algorithm Visualization</Typography>
            <AlgorithmVisualizer steps={algorithmSteps} currentStep={currentStep} />
          </Box>

          <Box sx={{ width: '50%', paddingLeft: 2, borderLeft: '1px solid #ccc' }}>
            <Typography variant="h6">Algorithm Code</Typography>
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px' }}>
              {selectedAlgorithm && implementations[selectedCategory]?.algorithms.find(algorithm => algorithm.name === selectedAlgorithm)?.code}
            </pre>
          </Box>
        </Box>
        <ToolbarControl executeAlgorithm={executeAlgorithm} algorithmSteps={algorithmSteps} />
      </Main>
    </Box>
  );
}
