import React, { useState } from 'react';
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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { algorithms } from './algorithms';

// Define drawer width and styling components
const drawerWidth = 240;

// Styled components
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

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openAlgorithms, setOpenAlgorithms] = useState({});
  const [algorithmImplementation, setAlgorithmImplementation] = useState('');
  const [visualizationState, setVisualizationState] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleToggleAlgorithms = (index) => {
    setOpenAlgorithms((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleAlgorithmClick = (algorithm) => {
    // This is where you'd set the implementation and visualization state
    setAlgorithmImplementation(`function ${algorithm}() { /* Implementation here */ }`);
    // Example visualization state (you can modify this based on actual implementation)
    setVisualizationState([1, 2, 3, 4, 5]);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
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
            Algorithms Visualizer
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
          {algorithms.map((category, index) => (
            <div key={category.title}>
              <ListItemButton onClick={() => handleToggleAlgorithms(index)}>
                <ListItemText primary={category.title} />
                {openAlgorithms[index] ? <ExpandMoreIcon /> : <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />}
              </ListItemButton>
              <Collapse in={openAlgorithms[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {category.algorithms.map((algorithm) => (
                    <ListItem key={algorithm} sx={{ pl: 4 }}>
                      <ListItemButton onClick={() => handleAlgorithmClick(algorithm)}>
                        <ListItemText primary={algorithm} sx={{ color: 'black' }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography variant="h5">Welcome to the Algorithms Visualizer!</Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Here you can explore various algorithms categorized into different sections. Click on the categories to reveal the algorithms.
        </Typography>
        
        {/* Dynamic Visualization Section */}
        <Box sx={{ display: 'flex', height: '100%', marginTop: 2 }}>
          <Box
            sx={{
              flex: 1,
              border: '1px solid lightgray',
              borderRadius: '8px',
              padding: 2,
              overflow: 'auto',
              backgroundColor: '#f9f9f9',
            }}
          >
            <Typography variant="h6">Algorithm Implementation</Typography>
            <pre>{algorithmImplementation}</pre>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 2,
              border: '1px solid lightgray',
              borderRadius: '8px',
              padding: 2,
              backgroundColor: '#f0f0f0',
            }}
          >
            <Typography variant="h6">Visualizations</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {visualizationState.map((value, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 50,
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid black',
                    borderRadius: '4px',
                    backgroundColor: value % 2 === 0 ? '#90caf9' : '#ffab91', // Example colors for values
                  }}
                >
                  {value}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Main>
    </Box>
  );
}
