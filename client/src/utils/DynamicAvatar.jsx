import React from 'react';
import Avatar from '@mui/material/Avatar';

// Function to generate color based on the first letter
const getColorByLetter = (letter) => {
  const colors = {
    A: '#f44336', // Red
    B: '#e91e63', // Pink
    C: '#9c27b0', // Purple
    D: '#673ab7', // Deep Purple
    E: '#3f51b5', // Indigo
    F: '#2196f3', // Blue
    G: '#03a9f4', // Light Blue
    H: '#00bcd4', // Cyan
    I: '#009688', // Teal
    J: '#4caf50', // Green
    K: '#8bc34a', // Light Green
    L: '#cddc39', // Lime
    M: '#ffeb3b', // Yellow
    N: '#ffc107', // Amber
    O: '#ff9800', // Orange
    P: '#ff5722', // Deep Orange
    Q: '#795548', // Brown
    R: '#607d8b', // Blue Grey
    S: '#9e9e9e', // Grey
    T: '#000000', // Black
    U: '#00bcd4', // Cyan
    V: '#3f51b5', // Indigo
    W: '#2196f3', // Blue
    X: '#9c27b0', // Purple
    Y: '#ff5722', // Deep Orange
    Z: '#e91e63', // Pink
    default: '#607d8b', // Default Blue Grey
  };

  return colors[letter] || colors.default;
};

const DynamicAvatar = ({ firstLetter, ...props }) => {
  const backgroundColor = getColorByLetter(firstLetter);


  return (
    <>
      {firstLetter.image ?
        <Avatar src={firstLetter.image}></Avatar>
        :
        <Avatar sx={{ marginRight: 2, backgroundColor }} {...props}>
          {firstLetter}
        </Avatar>
      }
    </>
  );
};

export default DynamicAvatar;
