const quizContainer = document.querySelector('#quiz-container');
const questionContainer = document.querySelector('#question-container');
const questionElement = document.querySelector('#question');
const answerButtonsElement = document.querySelector('#answer-buttons');
const nextButton = document.querySelector('#next-btn');
const submitButton = document.querySelector('#submit-btn');
const resultContainer = document.querySelector('#result-container');
const resultElement = document.querySelector('#result');
const restartButton = document.querySelector('#restart-btn');

let currentQuestionIndex, score, questions;

fetch('https://opentdb.com/api.php?amount=25')
    .then(response => response.json())
    .then(data => {
        questions = data.results.map((question, index) => ({
            ...question,
            id: index,
            answers: shuffle([...question.incorrect_answers, question.correct_answer])
        }));
        startQuiz();
    })
    .catch(error => console.error('Error fetching questions:', error));

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

