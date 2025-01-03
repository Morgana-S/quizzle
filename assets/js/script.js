const startQuizButton = document.getElementById('start-quiz-button');
const usernameInput = document.getElementById('username');
const quizSection = document.getElementsByTagName('section');
const introduction = document.getElementById('introduction');
const startButton = document.getElementById('start-quiz');
const answerBox = document.getElementsByClassName('quiz-button');
const powerUpButton = document.getElementsByClassName('powerup-button');
const dialog = document.querySelector('dialog');
const createDiv = document.createElement('div');
const closeButton = document.getElementById('close-feedback');
let currentQuestionNumber = 0;
let displayQuestionNumber = 1;
let score = 0;
let username;
let secondsLeft = 10;
let removedAnswers = 0;
let randomQuestions = [];
let randomNumbersArray = [];
let currentQuestion;
let timer;
let feedbackButton;
let quizTools;
let timerSpan;
let timerElement;
let removeOrderArray;
let hiddenBoxes;
let quizTextBox;

/**
 * Ensures the DOM content is loaded before using the random question order below and adding event listeners
 */
addEventListener("DOMContentLoaded", function() {
    questionRandomizer();
    usernameInput.addEventListener('input', function() {
        usernameValidation();
    })
    startQuizButton.addEventListener('click', function(){
        usernameValidation();
    })
    closeButton.addEventListener('click', function() {
        dialog.close();
    })
});

/**
 * Allows the user to click anywhere outside of the modal box on the document to close it
 */
dialog.addEventListener('click', event => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
        event.clientX < dialogDimensions.left ||
        event.clientX > dialogDimensions.right ||
        event.clientY < dialogDimensions.top ||
        event.clientY > dialogDimensions.bottom
    ) {
        dialog.close();
    }
});

/**
 * Ensures the user's selected name is only alphabetical characters and displays an error if the condition is not met.
 * @param {*} nameString - Name input by user
 */
function usernameValidation(nameString) {
    nameString = usernameInput.value;
    const regex = /[^A-Za-z]/g;
    const errorMessage = document.getElementById('username-error');
    // Displays a different error message depending on the conditions of the user's name string
    if (nameString.length < 2) {
        errorMessage.textContent = 'Name too short. Please create a name with 2 or more letters.';
        errorMessage.style.color = '#ff0000';
        startQuizButton.removeAttribute('onclick');
    } else if (regex.test(nameString)){
        errorMessage.textContent = 'Name contains forbidden characters. Please use only uppercase or lowercase letters.';
        errorMessage.style.color = '#ff0000';
        startQuizButton.removeAttribute('onclick')
    } else {
        errorMessage.textContent = 'Name is okay to use!';
        errorMessage.style.color = '#008000';
        startQuizButton.setAttribute('onclick', 'showQuiz()');
    }
    username = nameString;
}

/**
 * Hides the introduction and start quiz buttons.
 */
function hideIntroduction() {
    let introduction = document.getElementById('introduction');
    let startButton = document.getElementById('start-quiz');
    introduction.classList.add('hidden-element');
    startButton.classList.add('hidden-element');
}

/**
 * Creates the semantic layout for the quiz and labels each section with appropriate ids.
 */
function createQuizLayout() {
    // Creates semantic sections for the quiz-text and quiz-tools sections and adds it to the document
    for (let i = 0; i < 2; i++) {
        let createQuizSection = document.createElement('section');
        document.body.appendChild(createQuizSection);
    }
    quizSection[2].id = 'quiz-text-section';
    quizSection[3].id = 'quiz-tools';
    // Creates a div with class 'flex-container' and appends it as a child to the quiz sections
    for (let i = 2;  i < 4; i++) {
        let createFlex = document.createElement('div');
        createFlex.className = 'flex-container';
        quizSection[i].appendChild(createFlex);
    }
    quizSection[2].firstChild.id = 'quiz-container';
    quizSection[3].firstChild.id = 'quiz-tools';
}

/**
 * Adds divs for the quiz text and answer sections and fills them from the question pool.
 */
function displayQuestions() {
    currentQuestion = randomQuestions[currentQuestionNumber];
    // Creates a text container for the quiz question and appends it to the flex-container above
    let quizContainer = document.getElementById('quiz-container');
    let createQuizTextBox = document.createElement('div');
    createQuizTextBox.className = 'text-container';
    createQuizTextBox.innerHTML = 
    `<p class= "question-number">Question ${displayQuestionNumber} of 10</p>
    <p class="article-content">${currentQuestion.text}</p>`;
    quizContainer.appendChild(createQuizTextBox);
    // Creates four buttons to display the answers to the question above
    for (let i = 1; i <= 4; i++) {
        let createQuizButton = document.createElement('button');
        createQuizButton.className = 'quiz-button';
        // Displays the quiz answer text as html inside the button
        createQuizButton.innerHTML = 
        `<p>${Object.values(currentQuestion)[i][0]}</p>`;
        // Sets the attribute of "correct" for each box for checkAnswer function
        createQuizButton.setAttribute('correct', `${Object.values(currentQuestion)[i][1]}`);
        // Sets the onclick function of each button to run the showNextQuestion function
        createQuizButton.setAttribute('onclick', 'checkAnswer(this);showNextQuestion()');
        quizContainer.appendChild(createQuizButton);
    }
}

/**
 * Creates the elements for the quiz tools section, including the power-ups, restart button, and timer.
 */
function displayQuizTools() {
    quizTools = document.getElementById('quiz-tools');
    // Creates the boxes for the power-ups
    for (let i = 0; i < 3; i++) {
        let createPowerUpButton = document.createElement('button');
        createPowerUpButton.className = 'powerup-button';
        quizTools.firstChild.appendChild(createPowerUpButton);  
    }
    // Assigns icons, text labels and powerup information for tooltips to each powerup
    powerUpButton[0].innerHTML = 
    '<i class="fa-solid fa-snowflake"></i><p class="powerup-label-quiz">Freeze Timer</p>';
    powerUpButton[0].setAttribute('onclick', 'freezeTimer(this)');
    powerUpButton[0].setAttribute('data-powerup', 'Freeze timer');
    powerUpButton[1].innerHTML = 
    '<i class="fa-solid fa-scale-balanced"></i><p class="powerup-label-quiz">50/50</p>';
    powerUpButton[1].setAttribute('onclick', 'removeTwoAnswers(this)');
    powerUpButton[1].setAttribute('data-powerup', '50/50 - Remove Two Answers');
    powerUpButton[2].innerHTML = 
    '<i class="fa-solid fa-arrow-rotate-left"></i><p class="powerup-label-quiz">Restart Quiz</p>';
    powerUpButton[2].setAttribute('onclick', 'restartQuiz();');
    powerUpButton[2].setAttribute('data-powerup', 'Restart Quiz');
    // Creates the box for the timer
    createDiv.className = 'timer';
    createDiv.innerHTML = 
    `<span class='timer-span'>${secondsLeft}</span>
    <span class='timer-span'>seconds</span>`;
    quizTools.firstChild.appendChild(createDiv);
}

/**
 * Begins the quiz by hiding the introduction and creating the necessary elements.
 */
function showQuiz() {
    hideIntroduction();
    createQuizLayout();
    displayQuestions();
    displayQuizTools();
    startTimer();
}

/**
 * Resets the quiz to an initial state
 */
function restartQuiz() {
    // Stops the timer
    stopTimer();
    // Removes all questions from the question pool
    while (randomNumbersArray.length){
        randomNumbersArray.pop();
        randomQuestions.pop();
    }
    // Regenerates new questions for the pool
    questionRandomizer();
    // Resets all variables to their starting states
    currentQuestionNumber = 0;
    displayQuestionNumber = 1;
    score = 0;
    secondsLeft = 10;
    while (quizSection.length > 2) {
        quizSection[2].remove();
    }
    // Shows the introduction text and start quiz button again
    introduction.classList.remove('hidden-element');
    startButton.classList.remove('hidden-element');
}

/**
 * Starts the timer
 */
function startTimer() {
    // Displays black text when the timer is above 10 seconds, red text if the timer is below 6 seconds
    timerSpan = document.getElementsByClassName('timer-span');
    timer = setInterval(function() {
        secondsLeft--;
        updateTimeLeft();
        if (secondsLeft === 0) {
            for (let i = 0; i < timerSpan.length; i++) {
                timerSpan[i].style.color = '#ff0000';
            }
            stopTimer();
            showNextQuestion();
        } else if (secondsLeft < 6) {
            for (let i = 0; i < timerSpan.length; i++) {
                timerSpan[i].style.color = '#ff0000';
            }
        } else if (secondsLeft > 6) {
            for (let i = 0; i < timerSpan.length; i++) {
                timerSpan[i].style.color = '#000000';
            }
        }
    }, 1000);
}

/**
 * Updates the amount of time left in the timer
 */
function updateTimeLeft() {
    timerElement = document.getElementsByClassName('timer');
    timerElement[0].innerHTML = 
    `<span class='timer-span'>${secondsLeft}</span>
    <span class='timer-span'>seconds</span>`;
}

/**
 * Stops the timer
 */
function stopTimer() {
    clearInterval(timer);
}

/**
 * Stops the timer when the freeze timer button is pressed
 */
function freezeTimer(powerUpButton) {
    powerUpButton.remove();
    stopTimer();
}

/**
 * Removes two incorrect answers from the available options when 50/50 button is pressed
 */
function removeTwoAnswers(powerUpButton) {
    powerUpButton.remove();
    // Creates an order to attempt to remove the wrong answers in - this ensures randomness when removing answers (not the same answers removed each time)
    removeOrderArray = [];
    while (removeOrderArray.length < 4) {
        let randomNumber = (Math.floor(Math.random() * 4));
        if (!removeOrderArray.includes(randomNumber)) {
            removeOrderArray.push(randomNumber);
        }
    }
    let i = 0;
    while (removedAnswers < 2) {
        let chosenBox = answerBox[removeOrderArray[i]];
        let correct = chosenBox.getAttribute('correct');
        if (correct === 'false') {
            chosenBox.classList.add('hidden-answer');
            chosenBox.setAttribute('onclick', '');
            removedAnswers++;
            i++;
        } else if (correct === 'true') {
            i++;
        }
    }
}

/**
 * Brings back the removed answer boxes for when the 50/50 powerup is used
 */
function showAllAnswers() {
    hiddenBoxes = document.getElementsByClassName('hidden-answer');
    while (removedAnswers > 0) {
        hiddenBoxes[0].setAttribute('onclick', 'checkAnswer(this);showNextQuestion()');
        hiddenBoxes[0].classList.remove('hidden-answer');
        removedAnswers--;
    }
}

/**
 * Checks if the clicked answer is correct and increments the score if it is
 */
function checkAnswer(answerClicked) {
    if (answerClicked.getAttribute('correct') === 'true') {
        score++;
    }
}

/**
 * Function to show the next question, restarts the timer, and brings the answer boxes back if 50/50 powerup used
 */
function showNextQuestion() {
    // Amount of seconds left is 11 to show user that they 'start' with 10 seconds - otherwise seconds display starts from 9
    secondsLeft = 11;
    if (currentQuestionNumber < 9) {
        currentQuestionNumber++;
        displayQuestionNumber++;
        updateQuestion();
        showAllAnswers();
        stopTimer();
        startTimer();
    } else {
        stopTimer();
        showResults();
    }
}

/**
 * Changes the question displayed in the quiz
 */
function updateQuestion() {
    currentQuestion = randomQuestions[currentQuestionNumber];
    quizTextBox = document.getElementsByClassName('text-container');
    quizTextBox[1].innerHTML = 
    `<p class= "question-number">Question ${displayQuestionNumber} of 10</p>
    <p class="article-content">${currentQuestion.text}</p>`;
    for (let i = 0; i < 4; i++) {
        answerBox[i].innerHTML =
            `${Object.values(currentQuestion)[i + 1][0]}`;
        answerBox[i].setAttribute('correct', `${Object.values(currentQuestion)[i + 1][1]}`);
    }
}

/**
 * Hides the questions, answers and tools at the end of the quiz.
 */
function hideQuizAndTools() {
    for (let i = 2; i < 4; i++) {
        quizSection[i].classList.add('hidden-element');
    }
}

/**
 * Creates the results section and interior div, text areas and shows the user's score.
 */
function createResultsSection(){
    for (let i = 0; i < 2; i++){
        let createNewSection = document.createElement('section');
        document.body.appendChild(createNewSection);
    }
    quizSection[4].id ='quiz-results';
    quizSection[5].id ='restart-section';
    let createResultsTextBox = document.createElement('div');
    createResultsTextBox.className = 'text-container';
    createResultsTextBox.id = 'results-text';
    createResultsTextBox.innerHTML =
    `<p class="article-content"> Your score was:</p>
    <p class="score-number">${score}</p>`;
    document.getElementById('quiz-results').appendChild(createResultsTextBox);
}

/**
 * Creates a personalised message based on the user's name input at the start of the quiz and their score
 */
function personalisedScoreMessage(){
    let createScoreMessage = document.createElement('p');
    createScoreMessage.className = 'article-content';
    createScoreMessage.id = 'personalised-message';
    if (score < 6) {
        createScoreMessage.innerHTML = 
        `Good try ${username}, but you can do better! Why not give it another go? Click the restart button below to try again.`;
    } else if(score < 10) {
        createScoreMessage.innerHTML = 
        `You did really well, ${username}! Just a few more points for a perfect score! Click the restart button below to try again.`;
    } else {
        createScoreMessage.innerHTML = 
        `Wow, a perfect score! Excellent work, ${username}! Be sure to compare this with your friends! If you want to try some new questions, click the restart button below.`;
    }
    let resultsText = document.getElementById('results-text');
    resultsText.appendChild(createScoreMessage);
}

/**
 * Creates a restart button at the end of the quiz.
 */
function createRestartButton(){
    let createFlex = document.createElement('div');
    createFlex.className = 'flex-container';
    let restartSection = document.getElementById('restart-section');
    restartSection.appendChild(createFlex);
    let createPowerUpButton = document.createElement('button');
    createPowerUpButton.className = 'powerup-button';
    createPowerUpButton.innerHTML = 
    '<i class="fa-solid fa-arrow-rotate-left"></i><p class="powerup-label-quiz">Restart Quiz</p>';
    createPowerUpButton.setAttribute('onclick', 'restartQuiz();');
    createPowerUpButton.setAttribute('data-powerup', 'Restart Quiz');
    restartSection.firstChild.appendChild(createPowerUpButton);
}

/**
 * Creates a feedback button to show the modal at the end of the quiz.
 */
function createFeedbackButton(){
    let createPowerUpButton = document.createElement('button');
    createPowerUpButton.className = 'powerup-button';
    createPowerUpButton.innerHTML =
    `<i class="fa-solid fa-comment"></i><p class="powerup-label-quiz">Have feedback?</p>`
    createPowerUpButton.setAttribute('onclick', 'dialog.showModal()');
    createPowerUpButton.setAttribute('data-powerup', 'Have feedback?');
    let restartSection = document.getElementById('restart-section');
    restartSection.firstChild.appendChild(createPowerUpButton);
}

/**
 * Creates the results text box and displays the score
 */
function showResults() {
    hideQuizAndTools();
    createResultsSection();
    personalisedScoreMessage();
    createRestartButton();
    createFeedbackButton();
}

/**
 * Generates an array of random numbers to call as question indices
 */
function questionRandomizer() {
    while (randomNumbersArray.length < 10) {
        let randomNumber = Math.floor(Math.random() * 20);
        if (!randomNumbersArray.includes(randomNumber)) {
            randomNumbersArray.push(randomNumber);
            randomQuestions.push(questionsArray[randomNumber]);
        }
    }
}

/**
 * List of questions and answers
 */
let questionsArray = [
    {
        text: 'What is the capital city of Argentina?',
        answer1: ['Buenos Aires', true],
        answer2: ['Santiago', false],
        answer3: ['Bogotá', false],
        answer4: ['Sucre', false]
    },
    {
        text: 'How many bones are in an adult human body?',
        answer1: ['300', false],
        answer2: ['99', false],
        answer3: ['206', true],
        answer4: ['50', false]
    },
    {
        text: 'What is the chemical symbol for Silver?',
        answer1: ['Pt', false],
        answer2: ['Au', false],
        answer3: ['Ag', true],
        answer4: ['Sn', false]
    },
    {
        text: 'How many oceans are there on planet Earth?',
        answer1: ['4', false],
        answer2: ['7', true],
        answer3: ['8', false],
        answer4: ['5', false],
    },
    {
        text: 'Which Renaissance Artist painted the ceiling of the Sistine Chapel?',
        answer1: ['Leonardo Da Vinci', false],
        answer2: ['Michelangelo', true],
        answer3: ['Raphael', false],
        answer4: ['Donatello', false]
    },
    {
        text: 'Which planet in the solar system is the hottest?',
        answer1: ['Mars', false],
        answer2: ['Saturn', false],
        answer3: ['Venus', true],
        answer4: ['Mercury', false]
    },
    {
        text: '"Farfalle" is a type of:',
        answer1: ['Rice', false],
        answer2: ['Bean', false],
        answer3: ['Pasta', true],
        answer4: ['Vegetable', false]
    },
    {
        text: 'Nike is the greek goddess of:',
        answer1: ['Victory', true],
        answer2: ['Love', false],
        answer3: ['The Underworld', false],
        answer4: ['Wine', false],
    },
    {
        text: 'England won the FIFA World Cup in which year?',
        answer1: ['1934', false],
        answer2: ['1970', false],
        answer3: ['1966', true],
        answer4: ['2006', false]
    },
    {
        text: 'Which river flows through the Grand Canyon?',
        answer1: ['Mississipi River', false],
        answer2: ['Ohio River', false],
        answer3: ['Missouri River', false],
        answer4: ['Colorado River', true]
    },
    {
        text: 'Who wrote the novel "1984"?',
        answer1: ['Aldous Huxley', false],
        answer2: ['George Orwell', true],
        answer3: ['Ray Bradbury', false],
        answer4: ['J.R.R Tolkien', false]
    },
    {
        text: 'Who was the first President of the United States of America?',
        answer1: ['George Washington', true],
        answer2: ['Thomas Jefferson', false],
        answer3: ['Abraham Lincoln', false],
        answer4: ['John Adams', false],
    },
    {
        text: 'Which artist is famous for the painting "The Starry Night"?',
        answer1: ['Pablo Picasso', false],
        answer2: ['Claude Monet', false],
        answer3: ['Vincent Van Gogh', true],
        answer4: ['Salvadore Dali', false],
    },
    {
        text: 'In which sport would you use a shuttlecock?',
        answer1: ['Tennis', false],
        answer2: ['Badminton', true],
        answer3: ['Volleyball', false],
        answer4: ['Table Tennis', false]
    },
    {
        text: 'Which movie featured a character named "Jack Dawson"?',
        answer1: ['The Titanic', true],
        answer2: ['The Great Gatsby', false],
        answer3: ['Inception', false],
        answer4: ['Avatar', false],
    },
    {
        text: 'What does "HTTP" stand for in website addresses?',
        answer1: ['Hyper Transfer Text Protocol', false],
        answer2: ['Hypertext Transfer Protocol', true],
        answer3: ['Hyper Tool for Text Processing', false],
        answer4: ['Hyper Technology Transfer Process', false],
    },
    {
        text: 'Which band is famous for the album "Abbey Road"?',
        answer1: ['The Rolling Stones', false],
        answer2: ['Queen', false],
        answer3: ['The Beatles', true],
        answer4: ['Pink Floyd', false],
    },
    {
        text: 'Which animal is known as the "King of the Jungle"?',
        answer1: ['Tiger', false],
        answer2: ['Elephant', false],
        answer3: ['Gorilla', false],
        answer4: ['Lion', true],
    },
    {
        text: 'Which company developed the first iPhone?',
        answer1: ['Microsoft', false],
        answer2: ['Apple', true],
        answer3: ['Samsung', false],
        answer4: ['Google', false],
    },
    {
        text: 'What year did World War II end?',
        answer1: ['1940', false],
        answer2: ['1943', false],
        answer3: ['1945', true],
        answer4: ['1950', false],
    }
];