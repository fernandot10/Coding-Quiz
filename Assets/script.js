let score = 0;
var start = document.getElementById("startBtn");
var submit = document.getElementById("submitBtn");
start.onclick = startQuiz;
submit.onclick = submitScore;
var userScore = document.getElementById("userScore");

var highscores = [];
var timer = document.getElementById("timer");
var initialsSection = document.getElementById("initialsSection");
var initials = document.getElementById("initials");
var scores = document.getElementById("scores");

var questionSection = document.getElementById("questionSection");
var titleQ = document.getElementById("titleQ");
var resultQ = document.getElementById("resultQ");
var choices = document.getElementById("choices");
var currentQ;
var index = 0;


var questions = [
    {
        title: 'What does the abbreviation HTML stand for?',
        choices:
            ['HyperText Markup Language',
                'HighText Markup Language',
                'HyperText Markdown Language',
                'None of the above'],
        answer: "HyperText Markup Language"
    },
    {
        title: "How many sizes of headers are available in HTML by default?",
        choices: ['1',
            '2',
            '5',
            '6',],
        answer: "6"
    },
    {
        title: "What is the smallest header in HTML by default?",
        choices: ['h1', 'h3', 'h5', 'h6'],
        answer: "h6"
    },
    {
        title: "What are the types of lists available in HTML?",
        choices: ['Ordered, Unordered Lists',
            'Bulleted, Numbered Lists',
            'Named, Unnamed Lists',
            'None of the above'],
        answer: "Ordered, Unordered Lists"
    },
    {
        title: 'CSS stands for-',
        choices: ['Cascade style sheets',
            'Color and style sheets',
            'Control style sheets',
            'None of the above'],
        answer: "Cascade style sheets"
    },
    {
        title: 'Which function is used to serialize an object into a JSON string in Javascript?',
        choices: ['stringify',
            'parse()',
            'convert()',
            'None of the above'],
        answer: "stringify"
    },
    {
        title: 'How do you select elements with the class name "example"?',
        choices: ['example',
            'example',
            '.example',
            'Class example'],
        answer: ".example"
    },
    {
        title: 'Which of the following is the correct syntax to select all paragraph elements in a div element?',
        choices: ['div p',
            'p',
            'div#p',
            'div~p'],
        answer: "div p"
    }
];


function showQuestions() {
    currentQ = questions[index];
    titleQ.textContent = currentQ.title;
    choices.innerHTML = "";

    for (var i = 0; i < currentQ.choices.length; i++) {
        var choicesBtn = Object.assign(document.createElement("button"), { id: "choiceBtn" })
        choicesBtn.textContent = i + 1 + ". " + currentQ.choices[i];
        choices.appendChild(choicesBtn);
    }
};


var isPaused = false;
let time = 60;


function setTimer() {
    let countdownInterval = setInterval(function () {
        time--;
        timer.textContent = time + "";
        if (time <= -1) {
            pausedTimer(countdownInterval);
            end();
            time++;
            timer.textContent = time + "";
        }
    }, 1000);
};

function pausedTimer() {
    isPaused = true;
};


choices.addEventListener("click", function (event) {
    var selection = event.target;
    if (selection === questions[index].answer) {
        var result;
        score = score + 10;
    } else {
        time -= 10;
    }
    index++;
    if (timer <= 0 || questions[index] === questions.length) {
        end()
    } else {
        showQuestions();
    }
});


function startQuiz() {
    setTimer();
    start.setAttribute("hidden", "true");
    timer.removeAttribute("hidden");

    showQuestions();
};


function end() {
    pausedTimer();
    document.getElementById("questionSection").setAttribute("hidden", "true");
    initialsSection.removeAttribute("hidden")
    submit.removeAttribute("hidden");
    answerOutput.innerHTML = "";
    resultQ.textContent = "Submit you score below";
};


function submitScore() {
    initialsSection.removeAttribute("hidden");
    submit.setAttribute("hidden", "true");
    pausedTimer();

};


document.getElementById("submitBtn").addEventListener("click", function (event) {
    event.preventDefault();
    var userInitials = document.getElementById("initials").value;
    initials.value = " ";
    var userScore = userInitials.concat(": ", score);
    highscores.push(userScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    var listItem = document.createElement("li");
    listItem.textContent = userScore;
    scores.appendChild(listItem);
})


function viewHighscores() {
    highscores = JSON.parse(localStorage.getItem("highscores"));
    if (highscores === null) {
        highscores = [];
    }
};