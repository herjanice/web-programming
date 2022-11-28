# Web Programming HW#7

Basic Function:
1. Sign in 時輸入名字即可開始使用 ChatRoom app，並且跳轉至 ChatRoom 頁面，title 自動設為 sign in 時的名字 (如:Ric’s Chat Room) 如果使用者沒有輸入名字就按送出，應跳出錯誤訊息，禁止其 sign in。
2. 前端重新整理 or 開新開啟視窗時會回到 Sign In 畫面，且 input box 中會自動顯示最後一次 sign in 時的名字 (by local storage)。
3. 在後端使用 MongoDB 儲存所有人的對話紀錄。
4. 每個人登入後看到的是空的 chat room, 使用者按下 '+' 會跳出一個 Modal 來輸入想要對話者 （"friend") 的名字。
5. 在對話框 (chat box) 中，朋友的留言靠左對齊，而自己的留言靠右對齊，並且按照時間順序顯示，越 早的留言排在越上面。
6. 不管是你 or 朋友的留言，新的留言都是在 chat box 的最下方，並且在超過視窗高度後，每次留言的 變化都會自動驅動留言往上捲，確保最後的留言不會被切掉。
7. 當 chat room 有多個 chat boxes 的時候，使用者可以點擊上面的 tab label 以切換不同的 chat box. 而使用者點擊任何一個 chat box (i.e. 不一定要是 active) 的 ’x’ 時，會關閉該 chat box (但不會清掉在 DB 的對話紀錄)。關掉 chat box 請適當的更新 activeKey (i.e. 會換成關掉的 chat box 的右邊的那個 chat box, 而如果關掉的是最右邊的 chat box, 則換成關掉的 chat box 的左邊的 那個 chat box)
8.  自己可以跟自己對話 (i.e. 開啟 chat box 時名字寫自己的名字)，但所有對話訊息會都在右邊。
9. 當以上的動作發生時，會有 status 在對話框的上端適當地顯示出通知訊息。