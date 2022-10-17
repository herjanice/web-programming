/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [flagLocations, setFlagLocations] = useState([]);     // An array to store all the coordinate of 'flag'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(-1);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);

        setBoard(board => {
            return [...newBoard.board]
        })

        setMineLocations(mineLocations => {
            return [...newBoard.mineLocations]
        })

        setFlagLocations(flagLocations => {
            return []
        })

        setRemainFlagNum(mineNum)
        setWin(false);
        setGameOver(false);
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;

        const pos = [x,y]

        if (newBoard[x][y].revealed === false && newBoard[x][y].flagged === false && remainFlagNum > 0){
            setBoard(board => {
                const updateBoard = [...board]
                updateBoard[x][y].flagged = true
                return updateBoard
            })

            setFlagLocations(flagLocations => [...flagLocations, pos])
            setRemainFlagNum(remainFlagNum - 1)
        }
        else if (newBoard[x][y].flagged === true) {
            setBoard(board => {
                const updateBoard = [...board]
                updateBoard[x][y].flagged = false
                return updateBoard
            })
            setRemainFlagNum(remainFlagNum + 1)
            setFlagLocations((flagLocations) => {
                const newFlag = flagLocations.filter((flag) => {
                    return !(JSON.stringify(flag) == JSON.stringify(pos))
                })
                return newFlag
            })
        }
    };

    const findNeighbours = (board, x, y) => {
        let neighbours = [[x,y]]
        
        while (neighbours.length > 0){
            x = neighbours[0][0]
            y = neighbours[0][1]
            neighbours.shift()

            if (board[x][y].revealed===false && board[x][y].value !== '💣') {
                board[x][y].revealed = true

                if (board[x][y].value !==0) continue;

                if (x+1 < board.length && board[x+1][y].revealed === false) {
                    neighbours.push([x+1, y])
                }
                if (y+1 < board.length && board[x][y+1].revealed === false) {
                    neighbours.push([x, y+1])
                }
                if (x-1 >= 0 && board[x-1][y].revealed === false) {
                    neighbours.push([x-1, y])
                }
                if (y-1 >=0 && board[x][y-1].revealed === false) {
                    neighbours.push([x, y-1])
                }
            }
        }

        return board; 
    }
      

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));

        const updateBoard = findNeighbours(newBoard, x, y)
        console.log("updateBoard", updateBoard)
        setBoard(board => {
            const finalBoard = [...updateBoard]
            return finalBoard
        })

        if (newBoard[x][y].value === '💣') {
            console.log("gameOver")
            setGameOver(true)
        }
        console.log(board)
        console.log(gameOver)
    };

    const checkWin = () => {
        console.log("inCheckwin")
        if (remainFlagNum === 0) {
            const sortedFlag = flagLocations.sort((function(index) {
                return function(a, b) {
                    return (a[index] === b[index] ? 0: (a[index] < b[index] ? -1: 1))
                }
            }))

            const sortedMine = mineLocations.sort((function(index) {
                return function(a, b) {
                    return (a[index] === b[index] ? 0: (a[index] < b[index] ? -1: 1))
                }
            }))

            console.log(sortedFlag)
            console.log(sortedMine)

            if(JSON.stringify(sortedFlag) === JSON.stringify(sortedMine)) {
                setWin(true)
                setGameOver(true)
                console.log(win)
            }
        }
    };

    if (remainFlagNum===0 && !win) {
        checkWin()
    }

    return (
        <div className='boardPage' >
            <div className='boardWrapper' >
                {gameOver? (<Modal restartGame={restartGame} backToHome={backToHome} win={win} />) : null }
                <div className='boardContainer'>
                    <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver}/>
                    {board.map((board_rows, row_idx) => (
                        <div key={'row'+row_idx} id={'row'+row_idx} style={{display:'flex'}}>
                            {board_rows.map((board_cols, col_idx) => (
                                <Cell rowIdx={row_idx} colIdx={col_idx} detail={board_cols} updateFlag={updateFlag} revealCell={revealCell} />
                            ))}
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
}
    
export default Board;