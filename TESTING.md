# Testing & Bugs
## Manual Testing
### Compatability
| Test | Method | Results |
| --- | --- |---|
|Browser - basic functionality | Website was opened with Microsoft Edge, Google Chrome, and Mozilla Firefox. Quiz functionality was tested using the functionality methods below. | Webpage loaded correctly on all tested browsers. Further information on individual tests carried out below in 'functionality' section.
| Device - basic functionality | Website was opened using a desktop PC, Google Pixel 7 Mobile device, iPhone 14, and iPad. Quiz functionality was tested using the functionality methods below. | Webpage loaded correctly on all tested devices. Further information on individual tests carried out below in functionality section.
### Responsiveness
| Test | Method | Results |
| --- | --- | --- |
| Website Navigation | Webpage was opened and navigated to using Responsive Viewer to take screenshots. | Website is displaying in a satisfactory fashion. Please see below for screenshots.
#### Introduction Section
![iPhone Pro - Introduction Section](/documentation/testing-images/introduction-iphone-pro.png)
![iPhone 14 - Introduction Section](/documentation/testing-images/introduction-iphone.png)
![Pixel 7 - Introduction Section](/documentation/testing-images/introduction-pixel-pro.png)
![iPad - Introduction Section](/documentation/testing-images/introduction-ipad.png)
![Macbook Air - Introduction Section](/documentation/testing-images/introduction-macbook.png)
#### Mid-Quiz Section
![iPhone Pro - Mid-Quiz Section](/documentation/testing-images/mid-quiz-iphone-14-pro.png)
![iPhone 14 - Mid-Quiz Section](/documentation/testing-images/mid-quiz-iphone-14.png)
![Pixel 7 - Mid-Quiz Section](/documentation/testing-images/mid-quiz-pixel-pro.png)
![iPad - Mid-Quiz Section](/documentation/testing-images/mid-quiz-ipad.png)
![Macbook Air - Mid-Quiz Section](/documentation/testing-images/mid-quiz-macbook.png)
#### End-Quiz Section
![iPhone Pro - End-Quiz Section](/documentation/testing-images/end-quiz-iphone-pro.png)
![iPhone 14 - End-Quiz Section](/documentation/testing-images/end-quiz-iphone-14.png)
![Pixel 7 - End-Quiz Section](/documentation/testing-images/end-quiz-pixel.png)
![iPad - End-Quiz Section](/documentation/testing-images/end-quiz-ipad.png)
![Macbook Air - End-Quiz Section](/documentation/testing-images/end-quiz-macbook.png)
### Functionality
The following tests were carried out to determine the functionality of the website.
|Feature | Test | Method | Results |
|---|---|---|---|
|Logo Header | Link functionality | Logo link was clicked on a variety of devices mentioned above. | Logo correctly took me to the refreshed version of the index page.|
|Quiz Personalization| Confirm each set of result personalization is working correctly | Quiz was taken with specific results at the threshold points for each personalization option - 5 correct answers, 8 correct answers, and 10 correct answers respectively. | Quiz provided personalised result message for each threshold tested.
| Name Validation | Confirm that name input only accepts alphabetical characters | Attempted to enter a name with all special characters included here: [! @ # $ % ^ & * ( ) - _ = + \ \| [ ] { } ; : / ? . >] and all numbers 0 - 9. Alphabetical character string of only one character (e.g. just 'a', just 'b', etc.) also tried. | Name input did not allow quiz to proceed if forbidden characters were present or alphabetical string was less than two characters long.|
|Randomized Questions| Confirm that quiz is loading random questions each time the game is started. | Call the randomQuestions variable at different stages, including when the DOM content has loaded and when the quiz is restarted. | randomQuestions variable returns different questions when questionRandomizer function has been run, both on content load and restart quiz function. |
Powerup - Freeze Timer | Confirm the timer functions in line with expected behaviours. | Test if the timer is frozen on use, that the powerup button disappears, and the clock is restarted with the next question. | All conditions met successfully. Timer function is a little unreliable as detailed in bugs section below. | 
|Powerup - 50/50| Confirm that the 50/50 functions in line with expected behaviours. | Test if  two wrong answers are removed on use, the powerup button is removed on use, all removed answers are not interactable, and that removed answer boxes are redisplayed on next question. | All conditions met successfully. | 
Tooltips | Test that tooltips display correctly. | Tooltips are hovered over with the mouse cursor. Test carried out on different browsers to confirm translate CSS was being correctly displayed | All tooltips display successfully. On tablet and phone screen sizes, a label takes the place of the tooltip to account for a lack of cursor. |
Restart Quiz Functionality | Test that the quiz is able to be restarted. | Button is pressed both during the quiz, and at the end of the quiz. Check that all expected functions (timer, power-ups, toolstips, logo image link) are functioning successfully after restart button is pressed. | All functions working successfully.|
|Custom Exit-Intent Modal | Test that modal displays intended behaviour regarding clicking, how often the modal is shown. | Modal is triggered by mouse leaving the document body, modal link is clicked, modal backdrop is clicked to close modal, mouse leaves document body again to confirm the modal only displays once. | All tests completed and modal is performing as expected. | 
Quiz Buttons | Test that all quiz buttons are functional, both before and after powerup usage. | Go through the quiz, selecting one button for each answer 10 times, using a powerup and repeating the previous test. Restart the quiz and carry out the same tests again.| All quiz buttons maintained functionality both before and after powerup usage and after restarting the quiz.|
Scoring System | Test that scores are being recorded correctly. | Three sample quizes taken, where the score was manipulated deliberately by providing correct answers to a certain number of questions (4 correct answers, 8 correct answers, 10 correct answers) | Scoring system is recording scores correctly. | 
Timer | Check Timer is recording the time correctly. | Allow timer to run down to zero seconds, ensure that next question is then shown. Check that timer refreshes back to ten seconds. Freeze the timer and then ensure that the timer remains frozen for the current question. Click the next question and ensure timer restarts. | Timer functionality is working as intended for the most part - However, timer display is inconsistent and sometimes lingers on either ten seconds or 0 seconds for too long. Bug discovered where the timer displays "9" seconds when reinitialising rather than 10 seconds. Temporary workaround detailed below in the Bugs section.


## Peer Reviewed Testing
- The website was tested by three users on a variety of devices, from mobile phones to tablets and desktop PCs. User reports on website feedback detailed below.
- Each user carried out the tests listed in the functionality section above. All users then reported each feature was working as intended as above. 
## Feedback
- Users reported that the website was generally easy to understand. At time of initial testing, tooltips had not been added to the powerups - this was added and users reported that this allowed them to identify what each powerup did.
- Users were initially able to click 'missing' answers after the 50/50 function was used - CSS was then used to make sure the functionality of these answers was minimised while they were not applicable. Users reported this made it easier to understand how the power up worked.
- One user reported issues with getting hotfixed code to display properly after an update was pushed to GitHub. After some troubleshooting, it was discovered that the user's mobile phone browser was loading a cached version of the page. Closing the tab and reopening the deployed site fixed this issue. On reflection, advising users to close their browser fully or to refresh the cache would allow for less ambiguous testing conditions.
## Bugs
- While trying to update the timer, the time left was not updating.
    - Cause: secondsLeft variable was not defined outside of the setInterval function, causing it to be reset each time.
    - Fix: Define secondsLeft variable outside of the setInterval function.
- The checkAnswer function was calling the incorrect value.
    - Cause: The showNextQuestion function was calling first, causing the question to change and the checkAnswer to check the value of the button after it had changed.
    - Fix: Change onClick to checkAnswer before calling showNextQuestion.
- The timer appears to "start" at 9 seconds if the secondsLeft variable is set to 10.
    - Cause: This appears to be due to the timer counting '0' seconds as the 10th second.
    - Workaround: As this is not displayed to the user, I have set the starting time for each function activation to 11 seconds. For all intents and purposes, this indicates that the user has 10 seconds left at the start of the question.
## Code Validation
The website consists of one page, which was validated with the W3C HTML Validator and W3C Jigsaw CSS Validator, as shown below:
### HTML
![HTML Validation](/documentation/testing-images/html-validation.png)
### CSS
One warning was present for the CSS validation, which stated that the background color and color of a hidden class was the same. This is intended behaviour as it renders the element with the class invisible.
![CSS Validation](/documentation/testing-images/css-validation.png)
### JS
The source code for the site was run through the linter JSHint. JSHint is displaying that some variables are unused - these variables are defined in functions that are not called within the script itself, but are assigned to elements by the script.
![JS Validation](/documentation/testing-images/js-validation.png)
## Lighthouse Report
![Lighthouse Report](/documentation/testing-images/lighthouse-report.png)