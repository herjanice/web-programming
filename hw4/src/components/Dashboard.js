/****************************************************************************
  FileName      [ Dashnoard.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Dashboard. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import "./css/Dashboard.css"
let timeIntervalId;

export default function Dashboard({ remainFlagNum, gameOver }) {
  let [time, setTime] = useState(0);
  let [second, setSecond] = useState(0);
  let [minute, setMinute] = useState(0);
  let [sTime, setSTime] = useState(0);
  let [ssecond, setsSecond] = useState(0);
  let [sminute, setsMinute] = useState(0);

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
    setSecond(Math.floor((time / 1000) % 60))
    setMinute(Math.floor((time / 60000) % 60))
    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    setSTime(time)
    setsSecond(Math.floor((time / 1000) % 60))
    setsMinute(Math.floor((time / 60000) % 60))
    setTime(0)
  }, [gameOver]);

  return (
    <div className="dashBoard" >
      <div id='dashBoard_col1' >
        <div className='dashBoard_col'>
          <p className='icon'>🚩</p>
          {remainFlagNum}
        </div>
      </div>
      <div id='dashBoard_col2' >
        <div className='dashBoard_col'>
          <p className='icon'>⏰</p>
          {gameOver ? ("0"+sminute).slice(-2):("0"+minute).slice(-2)} : {gameOver ? ("0"+ssecond).slice(-2):("0"+second).slice(-2)}
        </div>
      </div>
    </div>
  );
}
