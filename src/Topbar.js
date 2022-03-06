import './Topbar.css'
import eversourcelogo from './logo.png'; // Tell webpack this JS file uses this image
import wpilogo from './logo2.png'

import React, { useState, useEffect } from 'react';

function Topbar() {
  return (
    <div className='outerContainer'>
      <div className='topbarContainer'> 
        <img className='logo2' src={wpilogo} />  
        <img className='logo' src={eversourcelogo} />
      </div>
    </div>

  );
}

export default Topbar;
