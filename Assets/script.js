var index = 0;
var score = 0;
var highScores = []
var selectionNumber
var list = document.getElementById('highScores');
var resetScreen = document.getElementById('reset-screen');
var timer = document.getElementById("timer");


var instructions = document.getElementById("intro");
var startScreen = document.getElementById('start-screen');
var start = document.getElementById("start");
var viewHighscores = document.getElementById("view-highscores");


var questionScreen = document.getElementById('question-screen');
var answerOutput = document.getElementById("answer-output");


var endScreen = document.getElementById('end-screen');


questionScreen.style.display = "none";
endScreen.style.display = "none";
resetScreen.style.display = "none";
timer.style.display = "block";


function startQuiz() {
    startScreen.style.display = "none";
    questionScreen.style.display = "block";
    quizQuestions()
    updateCountdown()
}


function quizQuestions() {
    if (index < questions.length) {
        var question = document.getElementById("question")
        var btn1 = document.getElementById("btn-a")
        var btn2 = document.getElementById("btn-b")
        var btn3 = document.getElementById("btn-c")
        var btn4 = document.getElementById("btn-d")


        question.innerHTML = questions[index].question;
        btn1.innerHTML = questions[index].choices[0];
        btn2.innerHTML = questions[index].choices[1];
        btn3.innerHTML = questions[index].choices[2];
        btn4.innerHTML = questions[index].choices[3];
    } else {
        questionScreen.style.display = "none";
        endScreen.style.display = "block";
        reset()
    }
}


var questions = [
    {
        question: 'What does the abbreviation HTML stand for?',
        choices:
            ['HyperText Markup Language',
                'HighText Markup Language',
                'HyperText Markdown Language',
                'None of the above'],
        answer: 0
    },
    {
        question: "How many sizes of headers are available in HTML by default?",
        choices: ['1',
                  '2', 
                  '5', 
                  '6',],
        answer: 3
    },
    {
        question: "What is the smallest header in HTML by default?",
        choices: ['h1', 'h3', 'h5', 'h6'],
        answer: 3
    },
    {
        question: "What are the types of lists available in HTML?",
        choices: ['Ordered, Unordered Lists',
            'Bulleted, Numbered Lists',
            'Named, Unnamed Lists',
            'None of the above'],
        answer: 0
    },
    {
        question: 'CSS stands for-',
        choices: ['Cascade style sheets',
                  'Color and style sheets',
                  'Control style sheets'],
        answer: 0
    },
    {
        question: 'Which function is used to serialize an object into a JSON string in Javascript?',
        choices: ['stringify',
                  'parse()',
                  'convert()',
                  'None of the above'],
        answer: 0
    },
    {
        question: 'How do you select elements with the class name "example"?',
        choices: ['example',
                  'example',
                  '.example',
                  'Class example'],
        answer: 2
    },
    {
        question: 'Which of the following is the correct syntax to select all paragraph elements in a div element?',
        choices: ['div p',
                  'p',
                  'div#p',
                  'div~p'],
        answer: 0
    }
];


let startingTime = 60;
function updateCountdown() {
    let countdownInterval = setInterval(function () {
        if (startingTime >= 1) {
            timer.textContent = startingTime;
            startingTime--;
        } else {
            timer.textContent = "Time's up!";
            clearInterval(countdownInterval)
            onSubmit()
            endQuiz()
        }
    }, 1000)
}


function reset() {
    startingTime = 60;
}


function quizSelection(selection) {
    if (selection === questions[index].answer) {
        answerOutput.innerHTML = "Correct!"
        score += 10
    } else {
        answerOutput.innerHTML = "Wrong!"
        startingTime -= 5;
    }
    index++;
    if (timer <= 0 || questions[index] === questions.length) {
        endQuiz()
    } else {
        quizQuestions();
    }
}


function endQuiz() {
    timer.style.display = "none";
    questionScreen.style.display = "none";
    resetScreen.style.display = "none";
    endScreen.style.display = "block";
}


function onSubmit() {
    var initials = document.getElementById("initials").value;
    highScores.push({ initials, score })
    var listItem = document.createElement("LI");
    listItem.appendChild(document.createTextNode(`${initials} - ${score}`));
    list.appendChild(listItem);
    score = 0;
    endScreen.style.display = "none";
    viewHighscores.style.display = "none";
    resetScreen.style.display = "block";
}


function viewScores() {
    if (startScreen.style.display === "block") {
        startScreen.style.display = "none"
    } else if (questionScreen.style.display === "block") {
        questionScreen.style.display = "none"
    } else if (endScreen.style.display === "block") {
        endScreen.style.display = "none"
    }
    resetScreen.style.display = "block";
    viewHighscores.style.display = "none";
    timer.style.display = "none";
    startScreen.style.display = "none";
}


function clearHighScores() {
    highScores = []
    list.innerHTML = "";
}


function restartQuiz() {
    resetScreen.style.display = "none";
    startScreen.style.display = "block";
    index = 0;
    answerOutput.innerHTML = "";
    viewHighscores.style.display = "block";
    timer.style.display = "block";
    reset()
}