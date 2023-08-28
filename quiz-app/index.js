const questions = [
    {
        question: "In which continent are Chile, Argentina and Brazil?",
        answers: [
            { text: "North America ", correct: false},
            { text: "South America", correct: true},
            { text: "Europe", correct: false},
            { text: "Australia", correct: false},
        ]
    },

    {
        question: "The Mad Hatter and the Cheshire Cat are characters in which famous book?",
        answers: [
            { text: "Winne-the-Pooh", correct: false},
            { text: "Charlotte's Web", correct: false},
            { text: "Charlie and the Chocolate Factory", correct: false},
            { text: "Alice in Wonderland", correct: true},
        ]
    },

    {
        question: "What measurement scale is used to determine wind speed?",
        answers: [
            { text: "Beaufort scale", correct: false},
            { text: "Richter scale", correct: true},
            { text: "Synoptic scale", correct: false},
            { text: "Gusting scale", correct: false},
        ]
    },

    {
        question: "In which city were the 1992 Summer Olympics held?",
        answers: [
            { text: "Atlanta", correct: false},
            { text: "Barcelona", correct: true},
            { text: "Sydney", correct: false},
            { text: "Seoul", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach( answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true"
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length ) {
        handleNextButton();
    } else {
        startQuiz();
    }
});


startQuiz();


