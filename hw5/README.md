# HW 5 - (Backend Practice) Number Guessing Game

Goal: Create a basic full-stack web application called "Number Guessing Game" using the React/Axios/Express framework. The application should allow users to play a simple guessing game.

Basic Function:
1. The frontend (App.js) handles the logic of the interface and manages states:
    - When the "start game" button is pressed, it sends an axios request to the server to generate a new random number for the game.
    - When the "guess!" button is pressed, it sends the input number to the server using Axios to check if it matches the random number, and receives a   corresponding status value (string) from the server:
        - If the input number is not valid, it will show "Not a legal number" error.
        - If the input number is smaller than the random number, it will show "Bigger" (guess a bigger number).
        - If the input number is larger than the random number, it will show "Smaller" (guess a smaller number).
    - When the player guesses the correct number, the interface will switch to display "you won! the number was xxx."
2. Axios.js implements the above communication between the frontend and the server using the three functions: { startGame, guess, restart }.
3. The backend/core/getNumber.js function generates a random number between 1 and 100 (as "number"). If a random number has already been generated, it will return the same number.
4. The backend/routes/guess.js defines three APIs { "/start", "/guess", "/restart" } as Express router-level middleware to handle requests from the frontend.
