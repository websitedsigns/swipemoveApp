import React, { useEffect } from 'react';
import './WelcomeScreen.css'; // Import the CSS file
import logo from '../assets/SwipeMove-3.png';
interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // Hide the welcome screen after 10 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 10000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Handle click event to skip the welcome screen
  const handleClick = () => {
    onComplete();
  };

  return (
    <div className="welcome-container" onClick={handleClick}>
      <img src={logo} alt="SwipeMove Logo" className="welcome-logo" />
     <p>Click to Enter</p>
    </div>
  );
};

export default WelcomeScreen;