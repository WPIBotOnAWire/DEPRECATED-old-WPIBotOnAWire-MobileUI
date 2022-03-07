import './EStop.css'

import React, { useState, useEffect } from 'react';

function EStop() {
  const [estop, setEstop] = useState(true);
  function handleButton(){
    setEstop(value => !value)
    if(estop){
      window.estopPub.publish(window.trueBoolMsg);
    }else{
      window.estopPub.publish(window.falseBoolMsg);
    }
  }
  
  return (
    <div className='estopContainer'>   
        <button onClick={handleButton} className={estop ? "button green" : "button red"} type="button">{estop ? "Activate Robot" : "Emergency Stop"}</button>
    </div>
  );
}

export default EStop;
