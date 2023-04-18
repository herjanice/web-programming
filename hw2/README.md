# HW 2 - Fake Google Meet (Advanced)

Goal: Replicating Google Meet page layout AND handling various events triggered by user interactions with Javascript

Basic Function:

1. When the (x) symbol is clicked, the participant will be removed from the meeting, and the small windows of the other participants will be moved up/left and rearranged.
2. When the mouse cursor enters (hover) a small window of a participant, three additional functional buttons will appear in the middle circle, wrapped in a semi-transparent oval shape. When the cursor enters this oval, the transparency of the oval will decrease (the color becomes darker). Then, if you click the pin icon (you must click on the pin icon, it will not work if you click on other icons), the participant will replace the current main window, and the current main window participant will be added to the sidebar.
3. When you click the oval on the user's avatar in the main window (you must click on the pin icon), the main window will be closed, and the participants on the main window will be added to the other participants and rearranged on the entire window.
4. If no one is currently anchored to the main window, clicking the oval on a participant's avatar will have the same function as (2), and the main window will appear. This participant will be anchored to the main window, and the other participants will be arranged in the sidebar.
5. If all participants are kicked out and only oneself remains, then oneself should occupy the entire window.


