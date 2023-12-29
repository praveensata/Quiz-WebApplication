const quizContainer = document.getElementById('quizContainer');
const nextButton = document.getElementById('nextButton');
const resultContainer = document.getElementById('resultContainer');
let currentQuestion = 0;

const quizData = [
    {
        question: 'Which country has won the most Cricket World Cups?',
        answers: ['Australia', 'India', 'West Indies', 'England'],
        correctAnswer: 'Australia'
    },
    {
        question: 'Who is known as the "God of Cricket"?',
        answers: ['Virat Kohli', 'Sachin Tendulkar', 'Ricky Ponting', 'Brian Lara'],
        correctAnswer: 'Sachin Tendulkar'
    },
    {
        question: 'What is the highest individual score in a Test match?',
        answers: ['375', '400', '401', '414'],
        correctAnswer: '400'
    }
];

function buildQuiz() {
    const currentQuestionData = quizData[currentQuestion];

    const quizPage = document.createElement('div');
    quizPage.classList.add('quiz-page');

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `<p>${currentQuestion + 1}. ${currentQuestionData.question}</p>`;

    const answersDiv = document.createElement('div');
    answersDiv.classList.add('answers');

    currentQuestionData.answers.forEach((answer, index) => {
        const inputId = `q${currentQuestion}a${index}`;
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="q${currentQuestion}" value="${answer}" id="${inputId}"> ${answer}`;
        answersDiv.appendChild(label);
    });

    quizPage.appendChild(questionDiv);
    quizPage.appendChild(answersDiv);

    quizContainer.innerHTML = '';
    quizContainer.appendChild(quizPage);
}

function nextQuestion() {
    const selectedAnswer = document.querySelector(`input[name="q${currentQuestion}"]:checked`);

    if (selectedAnswer) {
        currentQuestion++;

        if (currentQuestion < quizData.length) {
            buildQuiz();
        } else {
            displayResults();
        }
    } else {
        alert('Please select an answer before moving to the next question.');
    }
}

function displayResults() {
    let score = 0;

    quizData.forEach((questionData, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
        const correctAnswerId = `q${index}a${questionData.answers.indexOf(questionData.correctAnswer)}`;
        
        if (selectedAnswer && selectedAnswer.id === correctAnswerId) {
            score++;
        }
    });

    const resultText = `You scored ${score} out of ${quizData.length}.`;
    resultContainer.textContent = resultText;
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
}


// Start the quiz
buildQuiz();
quizContainer.style.display = 'block';
nextButton.style.display = 'block';
resultContainer.style.display = 'none';
