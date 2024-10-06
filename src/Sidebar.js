// src/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemText, Collapse, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
  
export default function Sidebar({ algorithms }) {
  const [openAlgorithms, setOpenAlgorithms] = React.useState({});
  const navigate = useNavigate(); // Hook for navigation

  const handleToggleAlgorithms = (index) => {
    setOpenAlgorithms((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleAlgorithmClick = (algorithm) => {
    navigate(`/algorithm/${algorithm}`); // Navigate to algorithm detail page
  };

  return (
    <div style={{ width: '240px', background: '#f4f4f4' }}>
      <List>
        {algorithms.map((category, index) => (
          <div key={category.title}>
            <ListItem button={value.toString()} onClick={() => handleToggleAlgorithms(index)}>
              <ListItemText primary={category.title} />
              {openAlgorithms[index] ? (
                <ExpandMoreIcon />
              ) : (
                <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
              )}
            </ListItem>
            <Collapse in={openAlgorithms[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {category.algorithms.map((algorithm) => (
                  <ListItem
                    button="true"
                    key={algorithm}
                    onClick={() => handleAlgorithmClick(algorithm)} // Call handleAlgorithmClick
                  >
                    <ListItemText primary={algorithm} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}
