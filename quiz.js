const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerForm = document.getElementById('answer-form');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex, score;
let questions = [];

// Fetch questions from the Trivia API
fetch('https://opentdb.com/api.php?amount=25')
    .then(response => response.json())
    .then(data => {
        questions = data;
        startQuiz();
    })
    .catch(error => console.error('Error fetching questions:', error));

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    nextButton.classList.remove('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    resetState();
    questionElement.innerText = question.question;
    question.incorrectAnswers.push(question.correctAnswer);
    question.incorrectAnswers.sort(() => Math.random() - 0.5); // Shuffle answers
    question.incorrectAnswers.forEach(answer => {
        const div = document.createElement('div');
        div.classList.add('form-group');
        div.innerHTML = `
            <label>
                <input type="radio" name="answer" value="${answer}">
                ${answer}
            </label>
        `;
        answerForm.appendChild(div);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerForm.firstChild) {
        answerForm.removeChild(answerForm.firstChild);
    }
}

function selectAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert('Please select an answer');
        return;
    }

    const correct = selectedAnswer.value === questions[currentQuestionIndex].correctAnswer;
    if (correct) {
        score++;
    }

    if (questions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    resultElement.innerText = `Your Score: ${score} / ${questions.length}`;
}

nextButton.addEventListener('click', selectAnswer);

restartButton.addEventListener('click', startQuiz);
