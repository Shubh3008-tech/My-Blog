import React from 'react';
// 1. Import your new logo image from the assets folder
//    (Make sure to change 'my-logo.png' to your actual file name)
import appLogo from '../assets/logo-removebg-preview (1).png'; 

function Logo({ width = '100px' }) {
  return (
    // 2. Render an <img> tag instead of the old text div
    <img 
      src={appLogo} 
      alt="BlogApp Logo" 
      style={{ width: width }} // Applies the width from props
      className="h-auto" // Automatically adjusts height to maintain aspect ratio
    />
  );
}

export default Logo;