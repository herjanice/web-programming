/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

// const findZeros = (board, x, y, newNonMinesCount) => {
//   if (x < 0 || x > len(board) || y < 0 || y > len(board)) return;

//   if (board[x][y].revealed === 0 && !board[x][y].revealed)
//   {
//     board[x][y].revealed = true;
//     newNonMinesCount--;

//     findZeros(x+1, y);
//     findZeros(x, y+1);
//     findZeros(x-1, y);
//     findZeros(x, y-1);
//   }
//   else {
//     return;
//   }
// }

export const revealed = (board, x, y, newNonMinesCount) => {
    board[x][y].revealed = true;
    newNonMinesCount--;

    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.
    
    // (board, x, y, newNonMinesCount)
    // console.log(board)


    return { board, newNonMinesCount };
};
