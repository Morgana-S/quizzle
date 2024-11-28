// When clicked, toggles display of the dropdown navigation menu
function displayMenu() {
    document.getElementById('dropdown-links').classList.toggle('show-dropdown');
}

// List of Questions and Answers
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
        text: 'Which movie featured a character named "Jack Dawson"',
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