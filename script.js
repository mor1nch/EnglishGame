// SETTINGS
// start-----------------------------------
canvasWidth = 600;
canvasHeight = 770;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;
// end-------------------------------------


// OBJECTS
// start-----------------------------------
let answerOBJECT = {
    height: 100,
    width: 120,
    x: 0,
    y: 100,
    xDirection: 0.5,
    color: "#F58E7E",
    speed: 0.5,
}

let GAME = {
    width: canvasWidth,
    height: canvasHeight,
    background: "#C0FF89",
}

let MODEL = {
    x: 0,
    y: canvasHeight - 80,
    width: 120,
    height: 80,
    color: "#1E90FF",
    xDirection: 160,
    yDirection: 50,
    score: 0,
}

let QUESTIONS = {
    easy1: {
        question: "test",
        correctAnswer: "correct",
        wrongAnswers: ["wrong1", "wrong2", "wrong3"],
        allAnswers: shuffle(["correct", "wrong1", "wrong2", "wrong3"]),
    },
    easy2: {
        question: "test1",
        correctAnswer: "correct1",
        wrongAnswers: ["w1", "w2", "w3"],
        allAnswers: shuffle(["correct1", "w1", "w2", "w3"]),
    },
    easy3: {
        question: "test2",
        correctAnswer: "correct2",
        wrongAnswers: ["1", "2", "3"],
        allAnswers: shuffle(["correct2", "1", "2", "3"]),
    },
    medium1: {
        question: "test3",
        correctAnswer: "correct3",
        wrongAnswers: ["5", "6", "7"],
        allAnswers: shuffle(["correct3", "5", "6", "7"]),
    },
    medium2: {
        question: "test4",
        correctAnswer: "correct4",
        wrongAnswers: ["8", "9", "10"],
        allAnswers: shuffle(["correct4", "8", "9", "10"]),
    },
    medium3: {
        question: "test5",
        correctAnswer: "correct5",
        wrongAnswers: ["D3", "D2", "D1"],
        allAnswers: shuffle(["correct5", "D3", "D2", "D1"]),
    },
    hard1: {
        question: "test6",
        correctAnswer: "correct6",
        wrongAnswers: ["A2", "A1", "A3"],
        allAnswers: shuffle(["correct6", "A2", "A1", "A3"]),
    },
    hard2: {
        question: "test7",
        correctAnswer: "correct7",
        wrongAnswers: ["B1", "B2", "B3"],
        allAnswers: shuffle(["correct7", "B1", "B2", "B3"]),
    },
    hard3: {
        question: "test8",
        correctAnswer: "correct8",
        wrongAnswers: ["C1", "C2", "C3"],
        allAnswers: shuffle(["correct8", "C1", "C2", "C3"]),
    },
    hard4: {
        question: "test9",
        correctAnswer: "correct9",
        wrongAnswers: ["asd", "Cфв2", "C3fd"],
        allAnswers: shuffle(["correct8", "asd", "Cфв2", "C3fd"]),
    },
    hard5: {
        question: "test10",
        correctAnswer: "correct10",
        wrongAnswers: ["C11", "C21", "C31"],
        allAnswers: shuffle(["correct10", "C11", "C21", "C31"]),
    },
    hard6: {
        question: "test11",
        correctAnswer: "correct11",
        wrongAnswers: ["C12", "C22", "C32"],
        allAnswers: shuffle(["correct11", "C12", "C22", "C32"]),
    },
}

let forTextObject = {
    levels: [
        QUESTIONS.easy1, QUESTIONS.easy2, QUESTIONS.easy3,
        QUESTIONS.medium1, QUESTIONS.medium2, QUESTIONS.medium3,
        QUESTIONS.hard1, QUESTIONS.hard2, QUESTIONS.hard3, QUESTIONS.hard4, QUESTIONS.hard5, QUESTIONS.hard6,
    ],
    check: true,
    indexOfCorrectAnswer: -1,
    cnt: 0,
}
// end-------------------------------------


// FUNCTIONS SETTINGS
// start-----------------------------------
function initEventsListeners() {
    window.addEventListener("keydown", gameControl);
}

function gameControl(event) {
    if (event.key === "ArrowLeft") {
        MODEL.x -= MODEL.xDirection;
    }
    if (event.key === "ArrowRight") {
        MODEL.x += MODEL.xDirection;
    }
    if (event.key === "ArrowUp") {
        MODEL.y -= MODEL.yDirection;
    }
    if (event.key === "ArrowDown") {
        MODEL.y += MODEL.yDirection;
    }
    modelPositionLimits();
}

function modelPositionLimits() {
    if (MODEL.x < 0) {
        MODEL.x = 0;
    }
    if (MODEL.x + MODEL.width > GAME.width) {
        MODEL.x = GAME.width - MODEL.width;
    }
    if (MODEL.y > GAME.height - MODEL.height) {
        MODEL.y = GAME.height - MODEL.height;
    }
    if (MODEL.y < answerOBJECT.y + answerOBJECT.height) {
        MODEL.y = answerOBJECT.y + answerOBJECT.height;
    }
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

// end-------------------------------------


// FUNCTIONS DRAW
// start-----------------------------------
function drawAnswerBlocks() {
    ctx.beginPath();
    ctx.fillStyle = answerOBJECT.color;
    ctx.fillRect(answerOBJECT.x, answerOBJECT.y, answerOBJECT.width, answerOBJECT.height);
    ctx.fillRect(answerOBJECT.width + 40, answerOBJECT.y, answerOBJECT.width, answerOBJECT.height);
    ctx.fillRect(answerOBJECT.width * 2 + 80, answerOBJECT.y, answerOBJECT.width, answerOBJECT.height);
    ctx.fillRect(answerOBJECT.width * 3 + 120, answerOBJECT.y, answerOBJECT.width, answerOBJECT.height);
}

function drawMainModel() {
    ctx.beginPath();
    ctx.fillStyle = MODEL.color;
    ctx.fillRect(MODEL.x, MODEL.y, MODEL.width, MODEL.height);
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(0, 99);
    ctx.lineTo(canvasWidth, 99);
    ctx.stroke();
    ctx.closePath();
}

function prepareToDrawAnswerText() {
    let level = forTextObject.levels[forTextObject.cnt];
    if (forTextObject.check === true) {
        forTextObject.check = false;

        if (MODEL.score <= forTextObject.levels.length - 1) {
            forTextObject.cnt += 1;
        } else {
            forTextObject.cnt = 0;
        }
    }
    forTextObject.indexOfCorrectAnswer = level.allAnswers.indexOf(level.correctAnswer);
    return level
}


function drawAnswerText() {
    let level = prepareToDrawAnswerText()
    ctx.beginPath();
    ctx.fillStyle = "#0004FA";
    ctx.font = "20pt avenir";
    ctx.fillText(level.allAnswers[0], answerOBJECT.x + 15, answerOBJECT.y + answerOBJECT.height / 2 + 5);
    ctx.fillText(level.allAnswers[1], answerOBJECT.x + 40 + answerOBJECT.width + 15, answerOBJECT.y + answerOBJECT.height / 2 + 5);
    ctx.fillText(level.allAnswers[2], answerOBJECT.x + 40 * 2 + answerOBJECT.width * 2 + 15, answerOBJECT.y + answerOBJECT.height / 2 + 5);
    ctx.fillText(level.allAnswers[3], answerOBJECT.x + 40 * 3 + answerOBJECT.width * 3 + 15, answerOBJECT.y + answerOBJECT.height / 2 + 5);
    ctx.closePath();
    return level
}

function drawQuestionText() {
    let level = drawAnswerText()
    ctx.beginPath();
    ctx.fillStyle = "#1F2533";
    ctx.font = "bold 28pt avenir";
    ctx.fillText(level.question, 30, 60);
    ctx.closePath();
}

function drawScore() {
    ctx.fillStyle = "";
    ctx.font = "30px avenir";
    ctx.fillText("Score: " + MODEL.score, GAME.width / 2 - 50, GAME.height / 2 - 50);
}

function drawGame() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawScore();
    drawAnswerBlocks();
    drawQuestionText();
    drawAnswerText();
    drawMainModel();
}

// end-------------------------------------


// FUNCTIONS GAMEPLAY
// start-----------------------------------
function increasingSpeed() {
    if (MODEL.score >= 30) {
        answerOBJECT.speed = 5.5;
    } else {
        answerOBJECT.speed *= 1.08;
    }
    MODEL.score += 1;
}

function comeBackToStartPosition() {
    answerOBJECT.y = 100;
    MODEL.x = 120 + 40;
    MODEL.y = canvasHeight - 80;
    forTextObject.check = true;
}

function moveAnswerBlocks() {
    // если блок с ответами соприкасается с блоком модельки
    if (answerOBJECT.y < GAME.height - MODEL.height - 20) {
        if (answerOBJECT.y >= MODEL.y - MODEL.height - 20) {
            // смещение главной модельки на исходное положение
            comeBackToStartPosition()
            // увеличение скорости моделек ответов
            increasingSpeed()
        }
        answerOBJECT.y += answerOBJECT.speed;
    } else {
        answerOBJECT.y = 100;
    }
}

// end-------------------------------------

function main() {
    initEventsListeners();
    drawGame();
    moveAnswerBlocks();
    requestAnimationFrame(main);
}

main();