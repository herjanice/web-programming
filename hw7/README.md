# HW 7 - ChatRoom (Full Stack Application)

Goal: Create a simple full-stack application called "Score Card DB" using React, Axios, Express, and Mongoose, which allows users to sign in, chat with friends, and store all conversations in a MongoDB database.

Basic Function:
1. Users can sign in with their name to start using the ChatRoom app and will be redirected to the ChatRoom page, with the title set to the name they signed in with (e.g. "Ric's Chat Room"). If the user tries to sign in without inputting a name, an error message will appear and sign-in will be prohibited.
2. When the front-end is refreshed or a new window is opened, the user will return to the Sign In page and the input box will automatically display the name from the last sign-in (using local storage).
All conversations will be stored in MongoDB in the backend.
3. When users log in, they will see an empty chat room. Users can click '+' to open a modal and enter the name of the person they want to chat with ("friend").
4. In the chat box, the friend's messages will be aligned to the left, and the user's messages will be aligned to the right, with messages displayed in chronological order (earlier messages at the top).
5. Whether it is the user's or the friend's message, new messages will appear at the bottom of the chat box, and when the chat box exceeds the height of the window, each new message will automatically scroll up to ensure that the final message is not cut off.
6. When there are multiple chat boxes in the chat room, users can click on the tab label above to switch between different chat boxes. When users click the 'x' button on any chat box (not necessarily the active one), that chat box will close (but the conversation history will not be cleared from the DB). When a chat box is closed, the activeKey will be appropriately updated (i.e., it will switch to the chat box to the right of the closed one, and if the closed chat box is the rightmost one, it will switch to the chat box to the left of the closed one).
7. Users can chat with themselves (i.e., open a chat box and enter their own name), but all conversation messages will be aligned to the right.
Appropriate status notifications will be displayed at the top of the chat box when any of the above actions occur.
