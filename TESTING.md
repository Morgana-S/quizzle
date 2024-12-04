# Testing & Bugs
## Compatibility
## Responsiveness
## Manual Testing
## Peer Reviewed Testing
## Feedback
## Bugs
- While trying to update the timer, the time left was not updating.
    - Cause: secondsLeft variable was not defined outside of the setInterval function, causing it to be reset each time.
    - Fix: Define secondsLeft variable outside of the setInterval function.
- The checkAnswer function was calling the incorrect value.
    - Cause: The showNextQuestion function was calling first, causing the question to change and the checkAnswer to check the value of the button after it had changed.
    - Fix: Change onClick to checkAnswer before calling showNextQuestion.
- The timer appears to "start" at 9 seconds if the secondsLeft variable is set to 10.
    - Cause: This appears to be due to the timer counting '0' seconds as the 10th second. As this is not displayed to the user, I have set the starting time for each function activation to 11 seconds.
    