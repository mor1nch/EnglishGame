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
    presentSimple1: {
        question: "I _ a book every evening.",
        correctAnswer: "read",
        allAnswers: shuffle(["read", "reads", "reading", "am reading"]),
        theme: "Present Simple",
    },
    presentSimple2: {
        question: "Cats _ milk",
        correctAnswer: "like",
        allAnswers: shuffle(["like", "likes", "are", "is"]),
        theme: "Present Simple",
    },
    presentSimple3: {
        question: "He _ play piano very well.",
        correctAnswer: "doesn’t",
        allAnswers: shuffle(["doesn’t", "don’t", "aren’t", "not"]),
        theme: "Present Simple",
    },
    presentSimple4: {
        question: "Does she _ in a band?",
        correctAnswer: "play",
        allAnswers: shuffle(["play", "plays", "playing", "played"]),
        theme: "Present Simple",
    },
    presentSimple5: {
        question: "My family and I _ together.",
        correctAnswer: "eat",
        allAnswers: shuffle(["eat", "eats", "eating", "ate"]),
        theme: "Present Simple",
    },
    presentSimple6: {
        question: "The dog _ under the bed.",
        correctAnswer: "sleeps",
        allAnswers: shuffle(["sleeps", "sleep", "sleeping", "slept"]),
        theme: "Present Simple",
    },
    pastSimple1: {
        question: "She _ learning English last year.",
        correctAnswer: "started",
        allAnswers: shuffle(["started", "starts", "start", "starting"]),
        theme: "Past Simple",
    },
    pastSimple2: {
        question: "Harry _ his homework last night.",
        correctAnswer: "did",
        allAnswers: shuffle(["did", "done", "do", "doing"]),
        theme: "Past Simple",
    },
    pastSimple3: {
        question: "I _ to the museum yesterday.",
        correctAnswer: "went",
        allAnswers: shuffle(["went", "was", "am", "do"]),
        theme: "Past Simple",
    },
    pastSimple4: {
        question: "Gary didn’t _ French at school.",
        correctAnswer: "study",
        allAnswers: shuffle(["study", "studied", "studying", "studies"]),
        theme: "Past Simple",
    },
    pastSimple5: {
        question: "I _ sleep last night.",
        correctAnswer: "didn’t",
        allAnswers: shuffle(["didn’t", "don’t", "wasn’t", "am not"]),
        theme: "Past Simple",
    },
    pastSimple6: {
        question: "Students watched a movie and _ it.",
        correctAnswer: "liked",
        allAnswers: shuffle(["liked", "like", "likes", "liking"]),
        theme: "Past Simple",
    },
    futureSimple1: {
        question: "I _ open the window.",
        correctAnswer: "will",
        allAnswers: shuffle(["will", "am", "did", "was"]),
        theme: "Future Simple",
    },
    futureSimple2: {
        question: "_ she dance tomorrow?",
        correctAnswer: "Will",
        allAnswers: shuffle(["Will", "Does", "Was", "Did"]),
        theme: "Future Simple",
    },
    futureSimple3: {
        question: "_ I help you?",
        correctAnswer: "Shall",
        allAnswers: shuffle(["Shall", "will", "Do", "Am"]),
        theme: "Future Simple",
    },
    futureSimple4: {
        question: "You _ arrive on time.",
        correctAnswer: "won’t",
        allAnswers: shuffle(["won’t", "willn’t", "don’t", "aren’t"]),
        theme: "Future Simple",
    },
    futureSimple5: {
        question: "I _ you the secret.",
        correctAnswer: "will tell",
        allAnswers: shuffle(["will tell", "did tell", "tell", "am tell"]),
        theme: "Future Simple",
    },
    futureSimple6: {
        question: "Students _ listen to music.",
        correctAnswer: "won’t",
        allAnswers: shuffle(["won’t", "willn’t", "don’t", "aren’t"]),
        theme: "Future Simple",
    },
}

let forTextObject = {
    levels: [
        QUESTIONS.presentSimple1, QUESTIONS.presentSimple2, QUESTIONS.presentSimple3,
        QUESTIONS.presentSimple4, QUESTIONS.presentSimple5, QUESTIONS.presentSimple6,
        QUESTIONS.pastSimple1, QUESTIONS.pastSimple2, QUESTIONS.pastSimple3,
        QUESTIONS.pastSimple4, QUESTIONS.pastSimple5, QUESTIONS.pastSimple6,
        QUESTIONS.futureSimple1, QUESTIONS.futureSimple2, QUESTIONS.futureSimple3,
        QUESTIONS.futureSimple4, QUESTIONS.futureSimple5, QUESTIONS.futureSimple6,
    ],
    check: true,
    indexOfCorrectAnswer: 0,
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

function drawFinishGameScreen() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    ctx.fillStyle = MODEL.color;
    ctx.font = "70px avenir";
    ctx.textAlign = "center";
    ctx.fillText("Stats loading...", GAME.width / 2, GAME.height / 2)
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
    if (MODEL.score > 22) {
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
            let state = isTrue(MODEL.x);
            if (state === true) {
                // смещение главной модельки на исходное положение
                comeBackToStartPosition();
                // увеличение скорости моделек ответов
                increasingSpeed();
            } else {
                // при завершении игры вывод статистики
                drawFinishGameScreen()
            }
        }
        answerOBJECT.y += answerOBJECT.speed;
    } else {
        answerOBJECT.y = 100;
    }
}

function isTrue(x) {
    let state = forTextObject.indexOfCorrectAnswer;
    if (x === 480 && state === 3) {
        return true;
    } else if (x === 320 && state === 2) {
        return true;
    } else if (x === 160 && state === 1) {
        return true;
    } else if (x === 0 && state === 0) {
        return true;
    }
    return false;
}

// end-------------------------------------

function main() {
    if (MODEL.score === forTextObject.levels.length - 1) {
        drawFinishGameScreen()
    } else {
        initEventsListeners();
        drawGame();
        moveAnswerBlocks();
        requestAnimationFrame(main);
    }
}

main();