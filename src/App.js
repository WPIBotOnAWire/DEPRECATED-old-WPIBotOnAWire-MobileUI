import React, { useState, useEffect } from 'react';
import './App.css';
import './Rawdata'
import EStop  from './EStop';
import Rawdata from './Rawdata';
import Topbar from './Topbar';
import Robotstate from './Robotstate';
import Minimap from './Minimap';
import Robot from './Robot';

function App() {
  const [voltage, setVoltage] = useState(0);
  const [current, setCurrent] = useState(0);
  const [encoder, setEncoder] = useState(0);
  const [frontRF, setFrontRF] = useState(0);
  const [backRF, setBackRF] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [sound, setSound] = useState(0);
  const [led, setLed] = useState(false);
  const [manual, setManual] = useState(false);
  const [state, setState] = useState("No Connection");

  useEffect(() => {
    window.battery_listener.subscribe(function(message) {
      setVoltage(message.voltage);
      setCurrent(message.current);
    });
    window.encoder_listener.subscribe(function(message) {
      setEncoder(message.data);
    });
    window.rangefinder_front_listener.subscribe(function(message) {
      setFrontRF(message.data);
    });
    window.rangefinder_back_listener.subscribe(function(message) {
      setBackRF(message.data);
    });
    window.motor_speed_listener.subscribe(function(message) {
      setSpeed(message.data);
    });
    window.deterrents_led_listener.subscribe(function(message) {
      setSound(message.data);
    });
    window.play_sound_listener.subscribe(function(message) {
      setLed(message.data);
    });
    window.manual_override_listener.subscribe(function(message) {
      setManual(message.data);
    });
    window.robot_state_listener.subscribe(function(message) {
      setState(message.data);
    });

  }, []); //Run only once

  return (
    <div className='container'>
      <Topbar/>
      <Robot voltage={voltage} frontRF={frontRF} backRF={backRF} state={state}/>
      {/* <Robotstate state={state}/> */}
      <Minimap speed={speed} encoder={encoder}/>
      <Rawdata
      voltage={voltage}
      current={current}
      encoder={encoder}
      frontRF={frontRF}
      backRF={backRF}
      speed={speed}
      sound={sound}
      led={led}
      manual={manual}
      state={state}
      />
      <EStop className='botBar'/>
    </div>
    
  );
}


export default App;
