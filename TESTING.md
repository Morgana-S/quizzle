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