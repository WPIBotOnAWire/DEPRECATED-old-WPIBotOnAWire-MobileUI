import React, { useState, useEffect } from 'react';
import './Rawdata.css'

function Rawdata(props) {
  var temp = window.tempData;


  return (
    <div className="RawdataContainer">
        <table className="dataTable">
            <tr>
              <th>Raw Data Feed</th>
              <th>Value</th>
              <th>Units</th>
            </tr>
            <tr>
              <td>Battery Voltage</td>
              <td>{props.voltage.toFixed(2)}</td>
              <td>mV</td>
            </tr>
            <tr>
              <td>Battery Current</td>
              <td>{props.current.toFixed(2)}</td>
              <td>mA</td>
            </tr>
            <tr>
              <td>Encoder</td>
              <td>{props.encoder}</td>
              <td>ticks</td>
            </tr>
            <tr>
              <td>Front Rangefinder</td>
              <td>{props.frontRF.toFixed(2)}</td>
              <td>inch</td>
            </tr>
            <tr>
              <td>Back Rangefinder</td>
              <td>{props.backRF.toFixed(2)}</td>
              <td>inch</td>
            </tr>
            <tr>
              <td>Robot Target Speed</td>
              <td>{(props.speed * 100).toFixed(0)}</td>
              <td>percent</td>
            </tr>
            <tr>
              <td>Deterrent Sound</td>
              <td>{props.sound}</td>
              <td>hz</td>
            </tr>
            <tr>
              <td>Deterrent LED</td>
              <td>{props.led ? "Enabled":"Disabled"}</td>
              <td></td>
            </tr>
            <tr>
              <td>Radio Overide</td>
              <td>{props.manual ? "Enabled":"Disabled"}</td>
              <td></td>
            </tr>
            <tr>
              <td>Robot State</td>
              <td>{props.state}</td>
              <td></td>
            </tr>
        </table>
    </div>
  );
}

export default Rawdata;