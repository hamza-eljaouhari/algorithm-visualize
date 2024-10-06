import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
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
import { algorithms } from './algorithmsImplementations';

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
  const [algorithmSteps, setAlgorithmSteps] = React.useState([]);
  const [currentStep, setCurrentStep] = React.useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const generateRandomArray = (size, min = 1, max = 100) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
  };

  const handleAlgorithmSelection = async (algorithmName) => {
    const algorithmImplementation = algorithms[algorithmName];
    if (algorithmImplementation) {
      const exampleArray = generateRandomArray(6, 1, 20);
      setSelectedAlgorithm(algorithmName);
      setAlgorithmSteps([]); // Reset steps before execution
      setCurrentStep(0);
    }
  };

const executeAlgorithm = async () => {
  if (!selectedAlgorithm) {
    console.error("No algorithm selected!");
    return;
  }

  const algorithmImplementation = algorithms[selectedAlgorithm];
  const exampleArray = generateRandomArray(6, 1, 20);
  const steps = await algorithmImplementation.execute(exampleArray, updateStep);

  setAlgorithmSteps(steps);
  setCurrentStep(0); // Start from the first step
  playSteps(steps.length); // Start progressing through the steps
};

// Function to progress through the steps
const playSteps = (totalSteps) => {
  let stepIndex = 0;
  const interval = setInterval(() => {
    if (stepIndex < totalSteps) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1)); // Move to the next step
      stepIndex++;
    } else {
      clearInterval(interval); // Stop when all steps are complete
    }
  }, 700); // Adjust the speed as necessary
};

  const updateStep = (step) => {
    setAlgorithmSteps(prev => [...prev, step]);
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
        <List>
          {Object.keys(algorithms).map((algorithmName, index) => (
            <ListItem button="true" key={index} onClick={() => handleAlgorithmSelection(algorithmName)}>
              <ListItemText primary={algorithmName} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <ToolbarControl executeAlgorithm={executeAlgorithm} algorithmSteps={algorithmSteps} />
        <AlgorithmVisualizer steps={algorithmSteps} currentStep={currentStep} />
      </Main>
    </Box>
  );
}
