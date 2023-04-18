# HW 4 - MineSweeper (ReactApp Development)

Goal: To better understand React App by using Hook techniques to implement a Minesweeper game. Users can adjust the difficulty of the game by adjusting the number of mines and the size of the map on the starting screen, and start the game by clicking "Start Game".

Basic Function:

1. When the user opens the homepage (HomePage), the screen will be displayed.
2. When the user clicks on the "StartGame" button in HomePage.js, the game will start and they will be taken to the Board page.
3. The game will begin by creating the game board.
4. When the user left-clicks on a cell, it will be revealed.
5. When the user right-clicks on a cell, it will update the flag. The conditions for updating the flag are as follows:
    - If the cell has already been revealed, the flag cannot be inserted.
    - If the cell has not been revealed and does not have a flag, a flag can be inserted.
    - If the cell already has a flag, the flag can be removed by right-clicking it again.

Advanced Function:

1. There is a difficulty adjustment feature. If the number of mines exceeds the total number of cells (n x n), an error message will appear and the font color will change to red.
2. When a cell is revealed, the neighboring cells will also be revealed, not just the four adjacent cells.
3. A modal will appear in the following situations:
    (1) All non-mine cells have been revealed.
    (2) Any mine cell has been revealed.
4. If situation (1) occurs, "WIN" will be displayed. If situation (2) occurs, "Game Over" will be displayed as shown in the demo video.
5. When the game is over, two buttons will appear (Back to Home & Try again / New Game). Clicking on the Back to Home button will take the user back to the HomePage. If the Try again / New Game button is clicked, a new board will be generated and the user can continue playing.
6. A timer will be implemented in Dashboard.js. The timer will start at 0 seconds for each new game and will stop when the game ends, displaying the total time spent playing the game.




