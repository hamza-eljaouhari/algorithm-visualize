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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

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

const algorithms = [
  {
    title: 'Divide and Conquer',
    algorithms: [
      'Bucket Sort',
      'Counting Sort',
      'Merge Sort',
      'Pigeonhole Sort',
      'Quicksort',
      'Radix Sort',
      'Binary Search',
      'Strassen\'s Matrix Multiplication',
      'Closest Pair of Points',
      'Convex Hull',
    ],
  },
  {
    title: 'Dynamic Programming',
    algorithms: [
      'Bellman-Ford\'s Shortest Path',
      'Catalan Number',
      'Fibonacci Sequence',
      'Floyd-Warshall\'s Shortest Path',
      'Integer Partition',
      'Knapsack Problem',
      'Knuth-Morris-Pratt\'s String Search',
      'Levenshtein\'s Edit Distance',
      'Longest Common Subsequence',
      'Longest Increasing Subsequence',
      'Longest Palindromic Subsequence',
      'Maximum Subarray',
      'Maximum Sum Path',
      'Nth Factorial',
      'Pascal\'s Triangle',
      'Shortest Common Supersequence',
      'Sieve of Eratosthenes',
      'Sliding Window',
      'Ugly Numbers',
      'Z String Search',
      'Matrix Chain Multiplication',
      'Edit Distance',
      'Coin Change Problem',
      'Subset Sum Problem',
      'Game Theory (Nim Game, Grundy Numbers)',
    ],
  },
  {
    title: 'Greedy',
    algorithms: [
      'Boyer–Moore\'s Majority Vote',
      'Dijkstra\'s Shortest Path',
      'Job Scheduling Problem',
      'Kruskal\'s Minimum Spanning Tree',
      'Prim\'s Minimum Spanning Tree',
      'Stable Matching',
      'Huffman Coding',
      'Activity Selection Problem',
      'Fractional Knapsack Problem',
      'Change-Making Problem',
    ],
  },
  {
    title: 'Simple Recursive',
    algorithms: [
      'Cellular Automata',
      'Cycle Detection',
      'Euclidean Greatest Common Divisor',
      'Nth Factorial',
      'Suffix Array',
      'Recursive Backtracking (e.g., N-Queens Problem, Sudoku Solver)',
    ],
  },
  {
    title: 'Graph Algorithms',
    algorithms: [
      'Depth-First Search (DFS)',
      'Breadth-First Search (BFS)',
      'A* Search Algorithm',
      'Topological Sorting',
      'Tarjan\'s Algorithm (Strongly Connected Components)',
      'Bellman-Ford Algorithm',
      'Johnson\'s Algorithm',
      'Minimum Spanning Tree (Kruskal and Prim)',
      'Floyd-Warshall Algorithm',
    ],
  },
  {
    title: 'Searching Algorithms',
    algorithms: [
      'Linear Search',
      'Binary Search',
      'Interpolation Search',
      'Exponential Search',
      'Fibonacci Search',
    ],
  },
  {
    title: 'Sorting Algorithms',
    algorithms: [
      'Bubble Sort',
      'Insertion Sort',
      'Selection Sort',
      'Shell Sort',
      'Heap Sort',
      'Comb Sort',
      'Tim Sort',
    ],
  },
  {
    title: 'String Algorithms',
    algorithms: [
      'Rabin-Karp Algorithm',
      'Z Algorithm',
      'Aho-Corasick Algorithm',
      'KMP Algorithm',
      'Suffix Tree Construction',
      'Longest Repeated Substring',
    ],
  },
  {
    title: 'Miscellaneous Algorithms',
    algorithms: [
      'Backtracking (e.g., Hamiltonian Cycle)',
      'Randomized Algorithms (e.g., Randomized QuickSort)',
      'Monte Carlo Algorithms',
      'Simulated Annealing',
      'Genetic Algorithms',
    ],
  },
  {
    title: 'Uncategorised',
    algorithms: [
      'Affine Cipher',
      'Caesar Cipher',
      'Freivalds\' Matrix-Multiplication Verification',
      'K-Means Clustering',
      'Magic Square',
      'Maze Generation',
      'Miller-Rabin\'s Primality Test',
      'Shortest Unsorted Continuous Subarray',
      'Conway\'s Game of Life',
    ],
  },
];

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openAlgorithms, setOpenAlgorithms] = React.useState({});

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
                      <ListItemText primary={algorithm} sx={{ color: 'black' }} />
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
      </Main>
    </Box>
  );
}
