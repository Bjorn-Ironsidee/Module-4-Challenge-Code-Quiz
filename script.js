const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const questionContainerElement = document.getElementById('question-container');
const resultContainerElement = document.getElementById('result-container');
const scoreContainerElement = document.getElementById('score-container');
const questionElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const initialsElement = document.getElementById('initials');
const highScoresElement = document.getElementById('high-scores');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
submitButton.addEventListener('click', saveHighScore);

function startQuiz() {
    startButton.style.display = 'none';
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.style.display = 'block';
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.style.display = 'none';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (!correct) {
        // Subtract time for incorrect answer
        // Implement timer functionality
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.style.display = 'block';
    } else {
        submitButton.style.display = 'block';
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function saveHighScore() {
    const initials = initialsElement.value;
    const score = 0; // Calculate score
    const highScore = { initials, score };
    // Save high score to local storage or server
    // Display high scores
}

const questions = [
    {
        question: 'What does DOM stand for in JavaScript?',
        answers: [
            { text: 'Document Object Model', correct: true },
            { text: 'Data Object Model', correct: false },
            { text: 'Document Oriented Model', correct: false },
            { text: 'Desktop Object Model', correct: false }
        ]
    },
    {
        question: 'Which keyword is used to declare a variable in JavaScript?',
        answers: [
            { text: 'var', correct: false },
            { text: 'let', correct: true },
            { text: 'const', correct: false },
            { text: 'variable', correct: false }
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Creative Style Sheets', correct: false },
            { text: 'Computer Style Sheets', correct: false },
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Colorful Style Sheets', correct: false }
        ]
    },
    {
        question: 'What is a closure in JavaScript?',
        answers: [
            { text: 'A function that has access to its outer scope', correct: false },
            { text: 'A function that returns another function', correct: false },
            { text: 'A combination of a function and the lexical environment within which that function was declared', correct: true },
            { text: 'A function that has access to global variables', correct: false }
        ]
    },
    {
        question: 'What is the purpose of a CDN in web development?',
        answers: [
            { text: 'To store data in a centralized location', correct: false },
            { text: 'To speed up the delivery of content to users by serving files from servers that are geographically closer to them', correct: true },
            { text: 'To encrypt data transmission over the internet', correct: false },
            { text: 'To manage database queries efficiently', correct: false }
        ]
    },
    {
        question: 'Which method is used to add a new element to an array in JavaScript?',
        answers: [
            { text: 'push()', correct: true },
            { text: 'add()', correct: false },
            { text: 'insert()', correct: false },
            { text: 'append()', correct: false }
        ]
    },
    {
        question: 'What is the difference between null and undefined in JavaScript?',
        answers: [
            { text: 'null is an object, undefined is a type', correct: false },
            { text: 'null is a type, undefined is an object', correct: false },
            { text: 'null represents the intentional absence of any object value, undefined is used for variables that have been declared but have not yet been assigned a value', correct: true },
            { text: 'undefined represents the intentional absence of any object value, null is used for variables that have been declared but have not yet been assigned a value', correct: false }
        ]
    },
    {
        question: 'What does MVC stand for in the context of web development?',
        answers: [
            { text: 'Model View Controller', correct: true },
            { text: 'Multiple View Configuration', correct: false },
            { text: 'Minimal Virtual Configuration', correct: false },
            { text: 'Model View Component', correct: false }
        ]
    },
    {
        question: 'Which of the following is not a valid JavaScript data type?',
        answers: [
            { text: 'number', correct: false },
            { text: 'array', correct: false },
            { text: 'boolean', correct: false },
            { text: 'float', correct: true }
        ]
    },
    {
        question: 'What is the purpose of the "use strict" directive in JavaScript?',
        answers: [
            { text: 'To enforce stricter parsing and error handling in your code', correct: true },
            { text: 'To enable experimental features in JavaScript', correct: false },
            { text: 'To improve performance by optimizing code execution', correct: false },
            { text: 'To disable certain JavaScript features for security reasons', correct: false }
        ]
    }
];
