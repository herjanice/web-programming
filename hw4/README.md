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

Advanced Function:

1. 有 Difficulty Adjustment 的功能。當地雷數量超過 Cell 總數 (n*n)，會有 Error Message 出現，而且 font 的顏色會改成紅的
2. 當 Cell 被 reveal 是，也會 reveal 整個 neighbouring cell，不只是他的四角而已。
3. Modal 會出現。 出現的條件如下：
    - (1) 所有非地雷的 Cell 都被 reveal 
    - (2) 任一個地雷的 Cell 被 reveal
    如果前述情況 (1) 會顯示 “WIN”， 若是情況 (2) 則會顯示如下圖所示“Game Over” 
4. 在遊戲結束，也會出現兩個 button （Back to Home & Try again / New Game）。Back to Home 這個 button 在按下去後，畫面便回到 HomePage。 如果是按下 Try again / New Game 這個 button ，則會重新產生一個新的 Board ，繼續遊 戲。
5. 在 Dashboard.js 中實作計時器。每個新遊戲皆從 0 秒開始計時，當遊戲結束時，計時器會停止在遊戲 結束的秒數。