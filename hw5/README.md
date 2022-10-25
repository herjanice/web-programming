# HW5 Backend Practice - Number Guessing Game

Basic Function:
1. (frontend/src/App.js) 處理畫面邏輯以及管理 states:
    - 當 “start game” 按鈕按下去之後，透過 axios 通知 server 去產生一個新的猜謎數字
    - 當 “guess!” 按鈕按下去之後，把輸入匡猜的數字透過 Axios 傳給 server 端去做判斷，並且接收 server 傳回來的猜測狀態，設定對應的 states 與 status 值 (字串):
        - 若是error：會印出 "Not a legal number"
        - number 若比較小：會印出 “Bigger” (猜大一 點)
        - number 若比較大：會印出 “Smaller” (猜小一 點)
    - 當猜到數字後，要切換畫面顯示 "you won! the number was xxx.”
2. (frontend/src/axios.js) 實現上述會跟 server 溝通的 { startGame, guess, restart } 這三個 functions
3. (backend/core/getNumber.js) function: getNumber() 會生一個介於 1 ~ 100 的隨機亂數 (as "number")。若已經生過，就會return一樣的number。
4. (backend/routes/guess.js) 實作 Express router-level middleware, 定義 { "/start", "/guess", "/restart" } 三個 APIs。