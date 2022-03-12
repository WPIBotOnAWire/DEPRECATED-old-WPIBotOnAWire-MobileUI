import './Robot.css'
import close_close from './robot_image/3_3.png'
import close_med from './robot_image/3_2.png'
import close_far from './robot_image/3_1.png'
import close_gone from './robot_image/3_0.png'
import med_close from './robot_image/2_3.png'
import med_med from './robot_image/2_2.png'
import med_far from './robot_image/2_1.png'
import med_gone from './robot_image/2_0.png'
import far_close from './robot_image/1_3.png'
import far_med from './robot_image/1_2.png'
import far_far from './robot_image/1_1.png'
import far_gone from './robot_image/1_0.png'
import gone_close from './robot_image/0_3.png'
import gone_med from './robot_image/0_2.png'
import gone_far from './robot_image/0_1.png'
import gone_gone from './robot_image/0_0.png'
import robot_charging from './robot_image/Charge.png'
import React, { useState, useEffect } from 'react';
import CrossfadeImage from 'react-crossfade-image';

const rfCloseLimit = 20; //inch
const rfMedLimit = 50; //inch
const rfFarLimit = 100; //inch

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}
function scale (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function median(values){
  if(values.length ===0) throw new Error("No inputs");

  values.sort(function(a,b){
    return a-b;
  });

  var half = Math.floor(values.length / 2);
  
  if (values.length % 2)
    return values[half];
  
  return (values[half - 1] + values[half]) / 2.0;
}

function selectImgFromBackRF(backRF,imgClose,imgMed,imgFar,imgGone){
  if(backRF < rfCloseLimit){
    return imgClose;
  }
  else if(backRF < rfMedLimit){
    return imgMed;
  }
  else if(backRF < rfFarLimit){
    return imgFar;
  }
  else{
    return imgGone
  }
}

function Robot(props) {

  const [batteryVals, setBatteryVals] = useState([0])
  const [batteryPercent, setBatteryPercent] = useState(1) 

  const [backRFVals, setBackRFVals] = useState([0])
  const [filteredBackRF, setFileteredBackRF] = useState(0) 

  const [frontRFVals, setFrontRFVals] = useState([0])
  const [filteredFrontRF, setFilteredFrontRF] = useState(0) 

  const voltageLowLimit = 15080; //in mV
  const voltageHighLimit = 15310; //in mV
  let batteryPercentRaw = clamp(Math.round(scale(props.voltage,voltageLowLimit,voltageHighLimit,0,100)),0,100);

  let r_frontRF = Math.round(props.frontRF);
  let r_backRF = Math.round(props.backRF);

  let imageToUse = close_close;

  useEffect(() => {
    if (props.state !== "Dettering Obstacle"){ //Large voltage sag when using LED and sound
      setBatteryVals([batteryPercentRaw, ...batteryVals].slice(0,100));
      setBatteryPercent(Math.round(median(batteryVals)));
    }
    setFrontRFVals([r_frontRF, ...frontRFVals].slice(0,10));
    setFilteredFrontRF(median(frontRFVals));
    setBackRFVals([r_backRF, ...backRFVals].slice(0,10));
    setFileteredBackRF(median(backRFVals));
    console.log(batteryPercent)
  },[props.voltage]);


  if (props.state === "Charging"){
    imageToUse = robot_charging;
  }
  else{
    if(filteredFrontRF < rfCloseLimit){
      imageToUse = selectImgFromBackRF(filteredBackRF,close_close,close_med,close_far,close_gone);
    }
    else if(filteredFrontRF < rfMedLimit){
      imageToUse = selectImgFromBackRF(filteredBackRF,med_close,med_med,med_far,med_gone);
    }
    else if(filteredFrontRF < rfFarLimit){
      imageToUse = selectImgFromBackRF(filteredBackRF,far_close,far_med,far_far,far_gone);
    }
    else{
      imageToUse = selectImgFromBackRF(filteredBackRF,gone_close,gone_med,gone_far,gone_gone);
    }
  }

  return (
    <div className='robotContainer'> 
      <CrossfadeImage src={imageToUse} durtaion="100" timingFunction="ease-in-out" />
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
              borderRadius: '2px',
              width: `${scale(batteryPercent,0,100,0,80)}px`,
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
