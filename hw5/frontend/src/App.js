import axios from 'axios'
import { useState } from 'react'
import { startGame, guess, restart } from './axios';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');

	const handleStartGame = async() => {
		const response = await startGame()
		console.log(response)
		setHasStarted(true)
	}

	const handleGuess = async() => {
    const response = await guess(number)
    console.log(response)
  
    if (response === 'Equal') setHasWon(true)
    else if (response === 'Bigger' || response === 'Smaller') {
      setStatus(response)
    }
    else {
      setStatus(response)
      setNumber('')
    }
  }

  const handleRestart = async() => {
    const response = await restart()
    console.log(response)
    setHasStarted(false)
    setHasWon(false)
    setNumber('')
  }

	const handleInput = (event) => {
		setNumber(event.target.value)
	}

  const startMenu = (
    <div>
      <button onClick={handleStartGame}> start game </button>
    </div>
	)

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input type="text" onChange={handleInput}></input>
      {/* How to write the handle guess, so that it could send to backend */}
      <button onClick={handleGuess} disabled={!number}>guess</button>
      <p>{status}</p>
    </>
	)

  const winningMode = (
    <>
      <p> you won! the number was {number}.</p>
      <button onClick={handleRestart}>restart</button>
    </>
  )

  const game = (
    <div> 
      {hasWon ? winningMode : gameMode}
    </div>
	)

  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
