// src/Dashboard.js
import React from 'react';
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
  const [open, setOpen] = React.useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [algorithmSteps, setAlgorithmSteps] = React.useState([]);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false); // For accordion state

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const generateRandomArray = (size, min = 1, max = 100) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
  };

  const handleAlgorithmSelection = async (categoryName, algorithmName) => {
    // Assume the selected algorithm has been passed correctly
    setSelectedAlgorithm(algorithmName);
    setSelectedCategory(categoryName);
    
    const algorithmImplementation = implementations[categoryName][algorithmName];
    
    console.log("categoryName ", categoryName)
    console.log("algorithmName ", algorithmName)

    if (algorithmImplementation) {
      const exampleArray = generateRandomArray(6, 1, 20);
      setAlgorithmSteps([]); // Reset steps before execution
      setCurrentStep(0);
      // Here you would call the algorithm's execution function as needed
    }
  };

  const executeAlgorithm = async () => {
    if (!selectedAlgorithm) {
      console.error("No algorithm selected!");
      return;
    }

    const algorithmImplementation = algorithms.find(category =>
      category.algorithms.includes(selectedAlgorithm)
    );

    const exampleArray = generateRandomArray(6, 1, 20);
    if (algorithmImplementation) {
      // You would need to implement the execution logic based on your specific implementation
      // For demonstration, just logging the selected algorithm and example array
      console.log(`Executing ${selectedAlgorithm} on`, exampleArray);
      // Update the algorithmSteps and currentStep accordingly
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
        {/* Accordion for categories and algorithms */}
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

        {/* Two 50% Width Boxes */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {/* Visualizer Box (Left 50%) */}
          <Box sx={{ width: '50%', paddingRight: 2 }}>
            <Typography variant="h6">Algorithm Visualization</Typography>
            <AlgorithmVisualizer steps={algorithmSteps} currentStep={currentStep} />
          </Box>

          {/* Code Display Box (Right 50%) */}
          <Box sx={{ width: '50%', paddingLeft: 2, borderLeft: '1px solid #ccc' }}>
            <Typography variant="h6">Algorithm Code</Typography>
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px' }}>
              {selectedAlgorithm && implementations[selectedCategory].algorithms.find((algorithm) => { return algorithm.name === selectedAlgorithm }).code }
            </pre>
          </Box>
        </Box>

        <ToolbarControl executeAlgorithm={executeAlgorithm} algorithmSteps={algorithmSteps} />
      </Main>
    </Box>
  );
}
