# HW4 MineSweeper
This project was made with React App.

Basic Function:

1. 一開始 (HomePage) 畫面會顯示出來。
2. 在 HomePage.js 按下 ”StartGame” 的 button 時，會開始遊戲會去 (Board) 的頁面。
3. 遊戲一開始會 createBoard。
4. 用 left Click 按下其中一個 Cell 會讓 Cell 被 reveal。
5. 用 right Click 按下其中一個 Cell 會讓 Cell updateFlag。updateFlag 條件如下：
    - 若此 Cell 已經被按開 (revealed)，不能再插上旗子。
    - 若此 Cell 沒有被插上旗子，且沒有被按開，可以插上旗子。
    - 若此 Cell 已經被插上旗子，可以再 right Click 拔掉旗子。
