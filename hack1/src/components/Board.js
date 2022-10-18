/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess }) => {
    console.log("board turn", turn)
    console.log("board guess", guesses)
    return (
        <div className="Board-container">
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
                {guesses.map((row, idx) => 
                    idx!==turn ? ( <Row id={"row_"+idx} key={"row_"+idx} guess={row} rowIdx={turn}/>) :
                    (<CurRow id={"row_"+idx} key={"row_"+idx} curGuess={curGuess} rowIdx={turn}/>)
                )}
            
        </div>
    )
};
export default Board;
