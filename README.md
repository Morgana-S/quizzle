# Quizzle - Test your knowledge with our quiz!
![Responsive Design Showcase](/documentation/feature-images/responsive-design-showcase.png)
## About
Quizzle is a simple quiz application which features interactivity through use of the JavaScript programming language. The purpose of the website is to challenge users to take part in a multiple-choice quiz where they can select an answer and then find out their score at the end of the quiz. The quiz utilises a randomness element to ensure replayability by pulling from a pool of questions.

The deployed version of the site can be accessed on GitHub Pages [here.](https://morgana-s.github.io/quizzle/)

## UX Design
The design of the website was created so that users:
- Could understand the layout of the quiz instantly, with consistent design between each question.
- Could navigate the site in a way that was consistent across all pages.
- Developed an intuitive understanding of how the website features worked, such as the power-ups and timer.
- Could browse the website comfortably using a variety of screen types (such as smartphone, tablet and laptop) due to the website implementing responsive design.

## Target Audience
- Users browsing the web looking for a quick and entertaining quiz to complete.
- Users looking to take the quiz in competition with their friends to compare scores.

## User Stories
**First Time Visitors:**
- As a first time visitor, I want to be able to use navigate the site using a navbar that's easy to understand.
- As a first time visitor, I want to be able to clearly understand the purpose of the site.
- As a first time visitor, I want the content to be displayed in a readable format.
- As a first time visitor, I want to have an intuitive understanding of the purpose of each interactive feature of the site.
- As a first time visitor, I want to see consistent design between each quiz question to recognize the key features of the quiz easily.

**Frequent Visitors:**
- As a frequent visitor, I want the quiz to remember my name for personalization of the score message.
- As a frequent visitor, I would like a way to compare my score on the quiz with my friends.
- As a frequent visitor, I would like to be able to provide feedback on the quiz.
- As a frequent visitor, I would like to be able to get different questions if I do the quiz multiple times.

## Features
### Logo Header
![Logo Header Image](/documentation/feature-images/logo-header.png)
- Simple, recognizable logo whci allows the user to refresh the page. 
- Logo has alt text and aria labelling for accessibility. 
- Logo is appropriately sized for all viewing devices and is responsive.
### Quiz Personalization & Name Validation
![Name Validation Showcase](/documentation/feature-images/name-validation.gif)
![Personal Score Message - Low Score](/documentation/feature-images/personal-score-low.png)
![Personal Score Message - Middle Score](/documentation/feature-images/personal-score-mid.png)
![Personal Score Message - High Score](/documentation/feature-images/personal-score-high.png)
- Using regex and event listeners for oninput, the user is guided to create a suitable name for their personalised score below.
- Using template literals and storing the user's name as a variable, a personalised score message can be provded based on how well the user performed in the quiz.
### Randomized Questions
![Random Questions Showcase](/documentation/feature-images/random-questions.gif)
- Questions are randomised by generating a question pool using Math.random(). This ensures that the user isn't getting the same questions each time.
- The question pool is formatted as an array of objects, which allows for new questions to be added easily. This also allows for the questions property's to be pulled as part of the functions for the site.
### Powerups
![Freeze Timer](/documentation/feature-images/freeze-timer.gif)
![Fifty-Fifty](/documentation/feature-images/fifty-fifty.gif)
- The site contains two powerups for users to utilise, each being available once per quiz. 
    - Freeze Timer - this freezes the timer to allow the user to answer the question at their own pace.
    - 50/50 (Fifty-Fifty) - This removes two random wrong answers from the current quiz question, allowing the user a 50% chance to pick the right answer.
### Tooltips
![Tooltips](/documentation/feature-images/tooltips.gif)
- The powerup and restart buttons are labelled with tooltips which, when hovered over, display the function of each button.
- The tooltips have a sleek and appealing transition design using CSS, which adds to the UX appeal of the website.
- For responsiveness and accessibility purposes, on screens where a mouse cursor is not necessarily an option (such as mobile phones and tablets), the tooltips are replaced with a label which is present underneath each icon.
### Restart Quiz Functionality
![Restart Quiz Function](/documentation/feature-images/restart-quiz.gif)
- The user is able to restart the quiz using one of the buttons available. This can be done mid-quiz, or at the end of the quiz.
- This allows the user to go back to the start if they need to reread the instructions, or to retry the quiz if they are not satisfied with their score, or would like to try different questions.
### Custom Exit-Intent Modal
![Exit Modal Functionality Showcase](/documentation/feature-images/exit-modal.gif)
- When the user's mouse leaves the page, an exit-intent modal displays asking the user to provide feedback on the GitHub issues page.
- The modal can be removed by clicking anywhere except the central text box where the modal displays. The user is given instructions on how to close the modal if they would like to.
- To prevent user annoyance, the modal will only show once when attempting to leave the page.
- The modal also warns the user that if they leave the page, their progress will not be saved on the quiz.
## Testing & Bugs
- For Testing and Bugs, please view the [TESTING.md](/TESTING.md) file.

## Validation & Accessibilty
- For inforamtion on code validation and accessibilty, please see the [TESTING.md](/TESTING.md) file.

## Tools
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - Page Structure and Content
- [HTML <dialog> Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) - Creation of an exit-intent modal.
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - Page appearance and styling rules.
- [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) - Used to add responsiveness to pages.
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) - Used to arrange tooltips for powerups.
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Page interactivity and functionality.
- [JavaScript Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) - Username validation.
- [JavaScript Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) - Interactivity based on certain conditions being met.
- [Visual Studio Code Desktop](https://code.visualstudio.com/) - IDE used for project development.
- [Git](https://git-scm.com/) - Version control.
- [GitHub Desktop](https://desktop.github.com/download/) - Additional version control.
- [Github](https://github.com/) - Project repo hosting.
- [GitHub Pages](https://pages.github.com/) - Project deployment.
- [Licecap](https://www.cockos.com/licecap/) - Screen recording GIFs for features demonstration.

## Deployment
### Deployment to GitHub Pages
- The page was deployed in the early stages to GitHub pages. The steps to deploy are as follows:
    1. In the GitHub [Repository](https://github.com/Morgana-S/quizzle), click the settings option at the top of the page.
    2. Under 'Code and Automation' on the left side, click 'Pages'.
    3. Under 'Build and Deployment' > 'Source', choose 'Deploy from a Branch'. The chosen branch to deploy should be 'Main'. Save these settings.
    4. Back under the code section at the top of the page, view the deployments on the right hand side, and select the 'Github-Pages' Deployment.

### Local Deployment
- In order to make a local copy of this project, it can be cloned. In your IDE terminal, type the command below to clone this repository:
    - ``git clone https://github.com/Morgana-S/quizzle.git``

## Credits
### Content
- [Coding2GO](https://www.youtube.com/watch?v=UQKWc2r_41U) - Guidance on creating a tooltip using CSS.
- [Web Dev Simplified Blog](https://blog.webdevsimplified.com/2023-04/html-dialog/) - Code for custom modal when the mouse leaves the document.
- [RegExr.com](https://regexr.com/) - Creation of appropriate regex for name validation. 
### Media
- [Google Fonts](https://fonts.google.com/) - Fonts used within the project (Gowun Dodum & Boogaloo)
- [Font Awesome](https://fontawesome.com/icons) - Icons and script for use of icons within the project.
