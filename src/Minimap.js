import './Minimap.css'
import arrow from './arrow.png'
import React, { useState, useEffect } from 'react';

function scale (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function Minimap(props) {

  const [leftOffset, setLeftOffset] = useState(50);
  const PATROL_FWD_LIM = 20000;
  const PATROL_REV_LIM = -40000;
  useEffect(() => {
    var offset = scale(props.encoder,PATROL_REV_LIM,PATROL_FWD_LIM,75,25)
    setLeftOffset(offset);
  }); //Run only once
  return (
    <div className='minimapContainer'> 
      <div className='leftPole'/>
      <div className='wire'/>
      <div className='wire dark'/>
      <div className='rightPole'/>
      <div className='leftLim dot'/>
      <div className='rightLim dot'/>
      <div className='dock dot'/>
      <div className='robot'
      style={{
        position: 'absolute',
        top: '2%',
        left: `${leftOffset}%`,
        width: '40px',
        height: '40px',
        borderRadius: '20px',
        backgroundColor: '#AC2B37',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <img className={props.speed > 0 ? 'arrow' : 'arrow flipped'} src={arrow} /> 
      </div>
      <text className='dock_text'>Dock</text>
      <text className='patrol_text'>Patrol Area</text>
    </div>
  );
}

export default Minimap;
