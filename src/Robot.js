import './Robot.css'
import robot_1 from './robot_image/test.png'
import React, { useState, useEffect } from 'react';

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}
function scale (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function Robot(props) {
  const voltageLowLimit = 14800; //in mV
  const voltageHighLimit = 16800; //in mV
  let batteryPercent = clamp(Math.round(scale(props.voltage,voltageLowLimit,voltageHighLimit,0,100)),0,100);
  batteryPercent = 30;

  return (
    <div className='robotContainer'> 
      <img src={robot_1} />
      <div className='batterySquare'>
        <div className='batteryPercent' style={{
            boxSizing: 'border-box',
            position: 'absolute',
            width: '100%',
            textAlign: `${batteryPercent > 49 ?"left":"right"}`,
            padding: '0 4px',
        }}>
          {batteryPercent}%
        </div>
        <div className='greenSquare' style={{
              borderRadius: '4px',
              width: `${scale(batteryPercent,0,100,0,75)}px`,
              height: '20px',
              background: `${batteryPercent < 30? batteryPercent < 10 ? "rgba(200, 0, 0, 0.8)":"rgba(200, 200, 0, 0.8)" : "rgba(0, 200, 0, 0.8)"}`,
        }}>
        </div>

      </div>
      <h2>{props.state}</h2>
    </div>
  );
}

export default Robot;
