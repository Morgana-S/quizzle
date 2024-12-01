// Ensures the DOM content is loaded before using the random question order below
addEventListener("DOMContentLoaded", function() {
    questionRandomizer();
    let startQuizButton = document.getElementById('start-quiz-button');
    startQuizButton.setAttribute('onclick', 'showQuiz()');
});

// Warns user before navigating away from site
window.onbeforeunload = function() {
    return true;
};

let currentQuestionNumber = 0;
let displayQuestionNumber = 1;
let username;
let score = 0;

/**
 * Removes the introductory text and creates the basic quiz structure in the DOM.
 */
function showQuiz() {
    let currentQuestion = randomQuestions[currentQuestionNumber];
     username = document.getElementById('username');
    if (!username.value && !document.getElementById('username-error')) {
        let createErrorMessage = document.createElement('p');
        createErrorMessage.id = 'username-error';
        createErrorMessage.className = 'error-message';
        createErrorMessage.innerHTML = 'Please enter a name before clicking start quiz.';
        document.getElementById('username').after(createErrorMessage);
    } else if (!username.value && document.getElementById('username-error')) {
        document.getElementById('username').focus();
    } else {
        // Removes the introduction text and start button
        let introduction = document.getElementById('introduction');
        let startButton = document.getElementById('start-quiz');
        introduction.remove();
        startButton.remove();
        // Creates semantic sections for the quiz-text and quiz-tools sections and adds it to the document
        for (let i = 0; i <= 1; i++) {
            let createQuizSection = document.createElement('section');
            document.body.appendChild(createQuizSection);
        }
        let quizSection = document.getElementsByTagName('section');
        quizSection[0].id = 'quiz-text-section';
        quizSection[1].id = 'quiz-tools';
        // Creates a div with class 'flex-container' and appends it as a child to the quiz sections
        for (let i = 0;  i <= 1; i++) {
            let createFlex = document.createElement('div');
            createFlex.className = 'flex-container';
            quizSection[i].appendChild(createFlex);
        }
        quizSection[0].firstChild.id = 'quiz-container';
        quizSection[1].firstChild.id = 'quiz-tools';
        // Creates a text container for the quiz question and appends it to the flex-container above
        let quizContainer = document.getElementById('quiz-container');
        let createQuizTextBox = document.createElement('div');
        createQuizTextBox.className = 'text-container';
        createQuizTextBox.innerHTML = 
        `<p class= "question-number">Question ${displayQuestionNumber} of 10</p><p class="article-content">${currentQuestion.text}</p>`;
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
        // Creates the boxes for the power-ups
        let quizTools = document.getElementById('quiz-tools');
        for (let i = 0; i <= 1; i++) {
            let createPowerUpButton = document.createElement('button');
            createPowerUpButton.className = 'powerup-button';
            quizTools.firstChild.appendChild(createPowerUpButton);  
        }
        let powerUpButton = document.getElementsByClassName('powerup-button');
        powerUpButton[0].innerHTML = 
        '<i class="fa-solid fa-snowflake"></i><p class="powerup-label-quiz">Freeze Timer</p>';
        powerUpButton[0].setAttribute('onclick', 'freezeTimer(this)');
        powerUpButton[0].setAttribute('data-powerup', 'Freeze timer');
        powerUpButton[1].innerHTML = 
        '<i class="fa-solid fa-scale-balanced"></i><p class="powerup-label-quiz">50/50</p>';
        powerUpButton[1].setAttribute('onclick', 'removeTwoAnswers(this)');
        powerUpButton[1].setAttribute('data-powerup', '50/50 - Remove Two Answers');
        // Creates the box for the timer
        let createTimer = document.createElement('div');
        createTimer.className = 'timer';
        createTimer.innerHTML = 
        `<span>${secondsLeft}</span><span>seconds</span>`;
        quizTools.firstChild.appendChild(createTimer);
        startTimer();
    }
}

let secondsLeft = 10;
let timer;

/**
 * Starts the timer
 */
function startTimer() {
    secondsLeft = 11;
    timer = setInterval(function() {
        secondsLeft--;
        updateTimeLeft();
        if (secondsLeft === 0) {
            stopTimer();
            showNextQuestion();
        }
    }, 1000);
}

/**
 * Updates the amount of time left in the timer
 */
function updateTimeLeft() {
    let timer = document.getElementsByClassName('timer');
    timer[0].innerHTML = 
    `<span>${secondsLeft}</span><span>seconds</span>`;
}

/**
 * Stops the timer
 */
function stopTimer() {
    clearInterval(timer);
}

/**
 * Stops the timer when the button is pressed
 */
function freezeTimer(powerUpButton) {
    powerUpButton.remove();
    stopTimer();
}

let removedAnswers = 0;

/**
 * Removes two incorrect answers from the available options 
 */
function removeTwoAnswers(powerupButton) {
    powerupButton.remove();
    let removeOrderArray = [];
    while (removeOrderArray.length < 4) {
        let randomNumber = (Math.floor(Math.random() * 4));
        if (!removeOrderArray.includes(randomNumber)) {
            removeOrderArray.push(randomNumber);
        }
    }
    console.log(removeOrderArray);
    let i = 0;
    while (removedAnswers < 2) {
        let chosenBox = answerBox[removeOrderArray[i]];
        let correct = chosenBox.getAttribute('correct');
        if (correct === 'false') {
            chosenBox.classList.add('hidden');
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
    let hiddenBoxes = document.getElementsByClassName('hidden');
    while (removedAnswers > 0) {
        hiddenBoxes[0].setAttribute('onclick', 'checkAnswer(this);showNextQuestion()');
        hiddenBoxes[0].classList.remove('hidden');
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

let answerBox = document.getElementsByClassName('quiz-button');

/**
 * Changes the question displayed in the quiz
 */
function updateQuestion() {
    let currentQuestion = randomQuestions[currentQuestionNumber];
    let quizTextBox = document.getElementsByClassName('text-container');
    quizTextBox[0].innerHTML = 
    `<p class= "question-number">Question ${displayQuestionNumber} of 10</p><p class="article-content">${currentQuestion.text}</p>`;
    for (let i = 0; i < 4; i++) {
        answerBox[i].innerHTML =
            `${Object.values(currentQuestion)[i + 1][0]}`;
        answerBox[i].setAttribute('correct', `${Object.values(currentQuestion)[i + 1][1]}`);
    }
}

/**
 * Creates the results text box and displays the score
 */
function showResults() {
    let section = document.getElementsByTagName('section');
    for (let i = 0; i < 2; i++) {
        section[0].remove();
    }
    let createNewSection = document.createElement('section');
    createNewSection.id = 'quiz-results';
    document.body.appendChild(createNewSection);
    let createResultsTextBox = document.createElement('div');
    createResultsTextBox.className = 'text-container';
    createResultsTextBox.id = 'results-text';
    createResultsTextBox.innerHTML =
    `<p class="article-content"> Your score was:</p>
    <p class="score-number">${score}</p>`;
    document.getElementById('quiz-results').appendChild(createResultsTextBox);
    let createScoreMessage = document.createElement('p');
    createScoreMessage.className = 'article-content';
    createScoreMessage.id = 'personalised-message';
    if (score < 6) {
        createScoreMessage.innerHTML = 
        `Good try ${username.value}, but you can do better! Why not give it another go? Click the logo at the top of the page to try again.`;
    } else if(score < 10) {
        createScoreMessage.innerHTML = 
        `You did really well, ${username.value}! Just a few more points for a perfect score! Click the logo at the top of the page to try again.`;
    } else {
        createScoreMessage.innerHTML = 
        `Wow, a perfect score! Excellent work, ${username.value}! Be sure to compare this with your friends! If you want to try some new questions, Click the logo at the top of the page to try again.`;
    }
    document.getElementById('results-text').appendChild(createScoreMessage);
}

let randomQuestions = [];
let randomNumbersArray = [];

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

// List of Questions and Answerss
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