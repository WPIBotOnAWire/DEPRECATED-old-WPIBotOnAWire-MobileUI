import './EStop.css'

import React, { useState, useEffect } from 'react';

function EStop(props) {
  const [estop, setEstop] = useState(true);
  
  useEffect(() => {
    if(props.manual){
      window.estopPub.publish(window.falseBoolMsg);
      setEstop(true);
    }
  },[props.manual]);

  function handleButton(){
    setEstop(value => !value)
    if(estop){
      window.estopPub.publish(window.trueBoolMsg);
    }else{
      window.estopPub.publish(window.falseBoolMsg);
    }
    console.log(estop);
  }
  
  return (
    <div className='estopContainer'>   
        <button disabled={props.manual} onClick={handleButton} className={estop ? props.manual ? "button yellow" : "button green" : "button red"} type="button">{estop ? props.manual ? "Radio Override" : "Activate Robot" : "Emergency Stop"}</button>
    </div>
  );
}

export default EStop;
