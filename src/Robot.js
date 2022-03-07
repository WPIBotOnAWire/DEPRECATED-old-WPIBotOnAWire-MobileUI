import './Robot.css'
import robot_1 from './robot_image/test.png'
import React, { useState, useEffect } from 'react';

function Robot(props) {
  return (
    <div className='robotContainer'> 
      <img src={robot_1} />
      <div className='batterySquare'/>
      {/* <h2>{props.voltage}</h2>
      <h2>{props.backRF}</h2>
      <h2>{props.frontRF}</h2> */}
      <h2>{props.state}</h2>
    </div>
  );
}

export default Robot;
