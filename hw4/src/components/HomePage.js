/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, errorOnChange, mineNum, boardSize, error }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.

  {/* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */}
  const showPanelOnChange = () => {
    showPanel? setShowPanel(false) : setShowPanel(true)
  }

  const sliderOnChange = (e) => {
    if (e.target.id === "mineNum") {
      if (e.target.value < boardSize*boardSize) {
        errorOnChange(false)
        mineNumOnChange(e.target.value)
      }
      else {
        errorOnChange(true)
        mineNumOnChange(e.target.value)
      }
    }
    else if(e.target.id === "boardSize") {
      if (e.target.value*e.target.value >= mineNum) {
        errorOnChange(false)
        boardSizeOnChange(e.target.value)
      }
      else {
        errorOnChange(true)
        boardSizeOnChange(e.target.value)
      }
    }
  } 

  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {/* Basic TODO:  Implement start button */}
      <button className='btn' onClick={startGameOnClick}>Start Game</button>

      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
      <div className="controlContainer">
        <button className="btn" onClick={showPanelOnChange}>Difficulty Adjustment</button>
        {showPanel ? (
          <div className="controlWrapper">
            {error ? (
              <div className="error"> ERROR! Mines number and board size are Invalid</div> ) : null
            }
            <div className="controlPanel"> 
              <div className="controlCol">
                <p className="controlTitle">Mines Number</p>
                <input id="mineNum" className="inputSlider" type='range' step='1' min={1} max={40} defaultValue={mineNum} onChange={(e) => sliderOnChange(e)} />
                <p className="controlName" style={error ? {color: "#880000"} : {color: "#0f0f4b"}}> {mineNum} </p>
              </div>
              <div className="controlCol">
                <p className="controlTitle">Board Size (nxn)</p>
                <input id="boardSize" className="inputSlider" type='range' step='1' min={1} max={16} defaultValue={boardSize} onChange={(e) => sliderOnChange(e)}/>
                <p className="controlName" style={error ? {color: "#880000"} : {color: "#0f0f4b"}}> {boardSize} </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>

    </div>
  );

}
export default HomePage;   