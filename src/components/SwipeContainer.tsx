import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import PropertyCard from './PropertyCard';
import { Property } from '../../types/types';
import { Button, Box } from '@mui/material';

interface SwipeContainerProps {
  properties: Property[];
  onSwipeLeft: (property: Property) => void;
  onSwipeRight: (property: Property) => void;
}

const SwipeContainer: React.FC<SwipeContainerProps> = ({ properties, onSwipeLeft, onSwipeRight }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
  });

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    setTimeout(() => {
      if (direction === 'left') {
        onSwipeLeft(properties[currentIndex]);
      } else {
        onSwipeRight(properties[currentIndex]);
      }
      setCurrentIndex((prev) => (prev + 1) % properties.length);
      setSwipeDirection(null);
    }, 300); // Animation duration
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
      <div {...handlers}>
        <div
          style={{
            transform: swipeDirection === 'left' ? 'translateX(-100%)' : swipeDirection === 'right' ? 'translateX(100%)' : 'translateX(0)',
            transition: 'transform 0.3s ease',
          }}
        >

<Box
  sx={{
    display: "flex",
    justifyContent: "center", // Align horizontally to the center
    alignItems: "flex-start", // Align vertically to the start, but you can change it to 'center' or 'flex-end'
    height: "80vh", // Use full viewport height
    paddingTop: "0px", // Adjust the top padding to move it lower
    background: "#5dc2bb"
    }}
>
<PropertyCard property={properties[currentIndex]} onClick={() => window.open(properties[currentIndex].url, '_blank')} />
</Box>
        </div>
      </div>
      <Box
  sx={{
    position: 'absolute', // Position relative to parent container
    top: '83%', // Adjust this percentage to move the buttons higher or lower
    left: '50%',
    transform: 'translateX(-50%)', // Centers the buttons horizontally
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  }}
>
  <Button
    variant="contained"
    sx={{
      backgroundColor: 'red',
      color: 'white',
      width: '4em',
      fontSize: '1rem',
      padding: '10px 20px',
      borderRadius: '10px',
    }}
    onClick={() => handleSwipe('left')}
  >
    x
  </Button>
  <Button
    variant="contained"
    sx={{
      backgroundColor: 'green',
      color: 'white',
      width: '4em',
      fontSize: '1rem',
      padding: '10px 20px',
      borderRadius: '10px',
    }}
    onClick={() => handleSwipe('right')}
  >
    Save
  </Button>
</Box>

    </Box>
  );
};

export default SwipeContainer;