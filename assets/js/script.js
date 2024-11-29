// Ensures the DOM content is loaded before using the random question order below
addEventListener("DOMContentLoaded", function() {
    questionRandomizer();
    let startQuizButton = document.getElementById('start-quiz-button');
    startQuizButton.setAttribute('onclick', 'showQuiz()');
    currentQuestionNumber = 0
    displayQuestionNumber = 1
    currentQuestion = randomQuestions[currentQuestionNumber]
    let score = 0;
})
// Toggles display of the dropdown navigation menu
function displayMenu() {
    document.getElementById('dropdown-links').classList.toggle('show-dropdown');
}

/**
 * Removes the introductory text and creates the basic quiz structure in the DOM.
 */
function showQuiz() {
    // Removes the introduction text and start button
    let introduction = document.getElementById('introduction');
    let startButton = document.getElementById('start-quiz');
    introduction.remove();
    startButton.remove();
    // Creates semantic sections for the quiz-text and quiz-tools sections and adds it to the document
    for (let i = 0; i <= 1; i++) {
        let createQuizSection = document.createElement('section')
        document.body.appendChild(createQuizSection);
    }
    let quizSection = document.getElementsByTagName('section');
    quizSection[0].id = 'quiz-text-section';
    quizSection[1].id = 'quiz-tools';
    // Creates a div with class 'flex-container' and appends it as a child to the quiz sections
    for (let i = 0;  i <= 1; i++) {
        let createFlex = document.createElement('div');
        createFlex.className = 'flex-container'
        quizSection[i].appendChild(createFlex);
    }
    quizSection[0].firstChild.id = 'quiz-container'
    quizSection[1].firstChild.id = 'quiz-tools'
    // Creates a text container for the quiz question and appends it to the flex-container above
    let quizContainer = document.getElementById('quiz-container');
    let createQuizTextBox = document.createElement('div');
    createQuizTextBox.className = 'text-container';
    createQuizTextBox.innerHTML = 
    `<p class= "question-number">Question ${displayQuestionNumber} of 10</p><p class="article-content">${currentQuestion.text}</p>`
    quizContainer.appendChild(createQuizTextBox);
    // Creates four buttons to display the answers to the question above
    for (let i = 1; i <= 4; i++) {
        let createQuizButton = document.createElement('button');
        createQuizButton.className = 'quiz-button';
        // Displays the quiz answer text as html inside the button
        createQuizButton.innerHTML = 
        `<p>${Object.values(currentQuestion)[i][0]}</p>`;
        // Sets the attribute of "correct" for each box for checkAnswer function
        createQuizButton.setAttribute('correct', `${Object.values(currentQuestion)[i][1]}`)
        // Sets the onclick function of each button to run the showNextQuestion function
        createQuizButton.setAttribute('onclick', 'showNextQuestion()');
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
    powerUpButton[0].innerHTML = '<i class="fa-solid fa-snowflake"></i>';
    powerUpButton[0].setAttribute('onclick', 'stopTimer()');
    powerUpButton[1].innerHTML = '<i class="fa-solid fa-scale-balanced"></i>';
    powerUpButton[1].setAttribute('onclick', 'removeTwoAnswers()');
    // Creates the box for the timer
    let createTimer = document.createElement('div')
    createTimer.className = 'timer';
    createTimer.innerHTML = 
    `<span>${secondsLeft}</span>
    <span>seconds`
    quizTools.firstChild.appendChild(createTimer);
    startTimer();
}

let secondsLeft = 10;
let timer;

function startTimer() {
    secondsLeft = 10;
    timer = setInterval(function() {
        secondsLeft--;
        updateTimeLeft();
        if (secondsLeft === 0) {
            stopTimer();
            showNextQuestion();
        }
    }, 1000)
};

function updateTimeLeft() {
    let timer = document.getElementsByClassName('timer');
    timer[0].innerHTML = 
    `<span>${secondsLeft}</span>
    <span>seconds`
}

function stopTimer() {
    clearInterval(timer);
}

function showNextQuestion() {
    let secondsLeft = 10;
    if (currentQuestionNumber < 9) {
        currentQuestionNumber++
        displayQuestionNumber++
        updateQuestion()
        console.log(currentQuestionNumber);
    } else {
        console.log('all questions answered!')
    }
}

let answerBox = document.getElementsByClassName('quiz-button');

function updateQuestion() {
    currentQuestion = randomQuestions[currentQuestionNumber]
    let quizTextBox = document.getElementsByClassName('text-container');
    quizTextBox[0].innerHTML = 
    `<p class= "question-number">Question ${displayQuestionNumber} of 10</p><p class="article-content">${currentQuestion.text}</p>`
    for (let i = 0; i < 4; i++) {
        answerBox[i].innerHTML =
            `${Object.values(currentQuestion)[i + 1][0]}`;
        answerBox[i].setAttribute('correct', `${Object.values(currentQuestion)[i + 1][1]}`)
    }
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
    console.log(randomQuestions);
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
        answer3: ['War', false],
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
]