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