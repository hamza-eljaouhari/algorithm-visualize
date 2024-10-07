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
import Visualizer from './Visualizer';
import { algorithms } from './algorithms';
import { implementations } from './implementations';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

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

// Custom scrollbar styling
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const generateParameters = (parameters) => {
    return parameters.map(param => {
      if (param.type === 'array') {
        return Array.from({ length: param.length }, () => Math.floor(Math.random() * (param.max - param.min + 1)) + param.min);
      } else if (param.type === 'sortedArray') {
        return Array.from({ length: param.length }, () => Math.floor(Math.random() * (param.max - param.min + 1)) + param.min).sort();
      } else if (param.type === 'matrix') {
        const [rows, cols] = param.size;
        return Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.floor(Math.random() * (param.max - param.min + 1)) + param.min));
      } else if (param.type === 'integer' || param.type === 'number') {
        return Math.floor(Math.random() * (param.max - param.min + 1)) + param.min;
      } else if (param.type === 'points') {
        return Array.from({ length: param.length }, () => [Math.floor(Math.random() * (param.max - param.min + 1)) + param.min, Math.floor(Math.random() * (param.max - param.min + 1)) + param.min]);
      }
      return null;
    });
  };

  const handleAlgorithmSelection = async (categoryName, algorithmName) => {
    setSelectedAlgorithm(algorithmName);
    setSelectedCategory(categoryName);

    const algorithmImplementation = implementations[categoryName]?.algorithms.find(alg => alg.name === algorithmName);

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
  
    updateStep({
      parameters: Object.fromEntries(generatedParams.map((param, i) => [algorithmImplementation.parameters[i].name, param])),
    });
  
    const result = await algorithmImplementation.execute(...generatedParams, (stepData) => {
      updateStep({
        ...stepData,
        parameters: Object.fromEntries(generatedParams.map((param, i) => [algorithmImplementation.parameters[i].name, param])),
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
    if (currentStep < algorithmSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 500);
      return () => clearTimeout(timer);
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
        <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', flexDirection: 'column' }}>
          {/* Parameters, Visualizer, and Final Result */}
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
              <Card sx={{ height: '33vh', overflowY: 'auto', backgroundColor: '#333', color: '#ddd', ...scrollbarStyle }}>
                <CardContent>
                  <Typography variant="h6">Initial Parameters</Typography>
                  <pre>{JSON.stringify(generatedParams, null, 2)}</pre>
                </CardContent>
              </Card>
              <Card sx={{ height: '33vh', overflowY: 'auto', backgroundColor: '#333', color: '#ddd', ...scrollbarStyle }}>
                <Visualizer steps={algorithmSteps} currentStep={currentStep} />
              </Card>
              <Card sx={{ height: '33vh', overflowY: 'auto', backgroundColor: '#333', color: '#ddd', ...scrollbarStyle }}>
                <CardContent>
                  <Typography variant="subtitle1">Final Result:</Typography>
                  <pre>{JSON.stringify(finalResult, null, 2)}</pre>
                </CardContent>
              </Card>
            </Box>

            {/* Code Visualizer Section */}
            <Box sx={{
              width: '50%',
              position: 'sticky',
              top: 0,
              height: '100vh',
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
          
          {/* Toolbar for Controls */}
          <ToolbarControl
            executeAlgorithm={executeAlgorithm}
            algorithmSteps={algorithmSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </Box>
      </Main>
    </Box>
  );
}
