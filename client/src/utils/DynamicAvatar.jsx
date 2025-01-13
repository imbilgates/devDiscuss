import React from 'react';
import Avatar from '@mui/material/Avatar';

// Function to generate color based on the first letter
const getColorByLetter = (letter) => {
  const colors = {
    A: '#f44336',
    B: '#e91e63',
    C: '#9c27b0',
    D: '#673ab7',
    E: '#3f51b5',
    F: '#2196f3',
    G: '#03a9f4',
    H: '#00bcd4',
    I: '#009688',
    J: '#4caf50',
    K: '#8bc34a',
    L: '#cddc39',
    M: '#ffeb3b',
    N: '#ffc107',
    O: '#ff9800',
    P: '#ff5722',
    Q: '#795548',
    R: '#607d8b',
    S: '#9e9e9e',
    T: '#000000',
    U: '#00bcd4',
    V: '#3f51b5',
    W: '#2196f3',
    X: '#9c27b0',
    Y: '#ff5722',
    Z: '#e91e63',
    default: '#607d8b',
  };

  return colors[letter] || colors.default;
};

const DynamicAvatar = ({ firstLetter, ...props }) => {
  // If `firstLetter` is an object, extract the first letter from its `name` property.
  let displayLetter = firstLetter;

  if (typeof firstLetter === 'object') {
    if (firstLetter.name) {
      displayLetter = firstLetter.name.charAt(0).toUpperCase();
    } else {
      displayLetter = '?';
    }
  }

  const backgroundColor = getColorByLetter(displayLetter);

  return (
    <>
      {firstLetter?.image ? (
        <Avatar src={firstLetter.image} />
      ) : (
        <Avatar sx={{ marginRight: 2, backgroundColor }} {...props}>
          {displayLetter}
        </Avatar>
      )}
    </>
  );
};

export default DynamicAvatar;
