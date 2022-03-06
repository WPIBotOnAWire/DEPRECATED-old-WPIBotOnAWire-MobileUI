import './Robotstate.css'

import React, { useState, useEffect } from 'react';

function Robotstate(props) {
  return (
    <div className='robotStateContainer'> 
      <h2>{props.state}</h2>
    </div>
  );
}

export default Robotstate;
