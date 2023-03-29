// SETTINGS
// start-----------------------------------
canvasWidth = 600;
canvasHeight = 770;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;
// end-------------------------------------


// Picture Creating
// start-----------------------------------
const img_rocket = new Image();
img_rocket.src = 'static/img/rocket.png';
const img_cloud = new Image();
img_cloud.src = 'static/img/clouds2.png';
// end-------------------------------------


// OBJECTS
// start-----------------------------------
let answerOBJECT = {
    pic: img_cloud,
    height: 100,
    width: 120,
    x: 0,
    y: 100,
    xDirection: 0.5,
    color: "#0004FA",
    speed: 0.5,
    offset: 40,
};

let GAME = {
    width: canvasWidth,
    height: canvasHeight,
};

let MODEL = {
    pic: img_rocket,
    x: 160,
    y: canvasHeight - 115,
    width: 140,
    height: 113,
    xDirection: 160,
    yDirection: 50,
    score: 0,
};

let QUESTIONS = {
    presentSimple1: {
        question: "I _ a book every evening.",
        correctAnswer: "read",
        allAnswers: shuffle(["read", "reads", "reading", "readed"]),
        theme: "Present Simple",
    },
    presentSimple2: {
        question: "Cats _ milk.",
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
        allAnswers: shuffle(["Shall", "Will", "Do", "Am"]),
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
};

var levels_list = [
    QUESTIONS.presentSimple1, QUESTIONS.presentSimple2, QUESTIONS.presentSimple3,
    QUESTIONS.presentSimple4, QUESTIONS.presentSimple5, QUESTIONS.presentSimple6,
    QUESTIONS.pastSimple1, QUESTIONS.pastSimple2, QUESTIONS.pastSimple3,
    QUESTIONS.pastSimple4, QUESTIONS.pastSimple5, QUESTIONS.pastSimple6,
    QUESTIONS.futureSimple1, QUESTIONS.futureSimple2, QUESTIONS.futureSimple3,
    QUESTIONS.futureSimple4, QUESTIONS.futureSimple5, QUESTIONS.futureSimple6,
];

let forAnswersText = {
    levels: shuffle(levels_list),
    check: true,
    indexOfCorrectAnswer: 0,
    cnt: 0,
};

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
    if (MODEL.x + 120 > GAME.width) {
        MODEL.x = GAME.width - 120;
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

// function Restart() {
//     canvasContext1.clearRect(0, 0, window.innerWidth, window.innerHeight)
//     document.body.removeChild(rule)
//
//     let gameVic = document.createElement("img");
//     gameVic.src = './imgs/rel.png';
//
//     gameVic.style.position = "absolute"
//     gameVic.style.width = window.innerWidth / 6 + "px"
//     gameVic.style.height = window.innerHeight / 7 + "px"
//     gameVic.style.top = '85%'
//     gameVic.style.left = '50%'
//     gameVic.style.transform = 'translate(-50%, -50%)'
//     document.body.appendChild(gameVic)
//
//     gameVic.addEventListener('click', function () {
//         location.reload()
//     })
// }

// end-------------------------------------


// FUNCTIONS DRAW
// start-----------------------------------
function drawAnswerBlocks() {
    ctx.drawImage(answerOBJECT.pic, answerOBJECT.x, answerOBJECT.y, answerOBJECT.width, answerOBJECT.height)
    ctx.drawImage(answerOBJECT.pic, answerOBJECT.x + answerOBJECT.width + answerOBJECT.offset, answerOBJECT.y, answerOBJECT.width, answerOBJECT.height)
    ctx.drawImage(answerOBJECT.pic, answerOBJECT.x + (answerOBJECT.width + answerOBJECT.offset) * 2, answerOBJECT.y, answerOBJECT.width, answerOBJECT.height)
    ctx.drawImage(answerOBJECT.pic, answerOBJECT.x + (answerOBJECT.width + answerOBJECT.offset) * 3, answerOBJECT.y, answerOBJECT.width, answerOBJECT.height)
}

function drawMainModel() {
    ctx.drawImage(img_rocket, MODEL.x, MODEL.y, MODEL.width, MODEL.height)
    ctx.beginPath();
    ctx.moveTo(0, 99);
    ctx.lineTo(canvasWidth, 99);
    ctx.stroke();
    ctx.closePath();
}

function prepareToDrawAnswerText() {
    let level = forAnswersText.levels[forAnswersText.cnt];
    if (forAnswersText.check === true) {
        forAnswersText.check = false;

        if (MODEL.score <= forAnswersText.levels.length - 1) {
            forAnswersText.cnt += 1;
        } else {
            forAnswersText.cnt = 0;
        }
    }
    forAnswersText.indexOfCorrectAnswer = level.allAnswers.indexOf(level.correctAnswer);
    return level
}

function drawAnswerText() {
    let level = prepareToDrawAnswerText()
    ctx.beginPath();
    ctx.fillStyle = answerOBJECT.color;
    ctx.font = "18pt avenir";
    let start_x = answerOBJECT.x + 20
    let y = answerOBJECT.y + answerOBJECT.height / 2 + 15
    let up_level = answerOBJECT.width + answerOBJECT.offset
    for (let i = 0; i < 4; i++) {
        if (level.allAnswers[i].length <= 2) {
            ctx.fillText(level.allAnswers[i], start_x + up_level * i + 24, y);
        }
        if (level.allAnswers[i].length <= 4 && level.allAnswers[i].length > 2) {
            ctx.fillText(level.allAnswers[i], start_x + up_level * i + 16, y);
        }
        if (level.allAnswers[i].length <= 6 && level.allAnswers[i].length > 4) {
            ctx.fillText(level.allAnswers[i], start_x + up_level * i + 7, y);
        }
        if (level.allAnswers[i].length <= 8 && level.allAnswers[i].length > 6) {
            ctx.fillText(level.allAnswers[i], start_x + up_level * i - 2, y);
        }
        if (level.allAnswers[i].length > 8) {
            ctx.fillText(level.allAnswers[i], start_x + up_level * i - 4, y);
        }
    }
    ctx.closePath();
    return level
}

function drawQuestionText() {
    let level = drawAnswerText()
    ctx.beginPath();
    ctx.fillStyle = "#1F2533";
    ctx.font = "bold 24pt avenir";
    ctx.fillText(level.question, 20, 60);
    ctx.closePath();
}

function drawFinishGameScreen() {
    let text = `Your score: ${MODEL.score}`;
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    ctx.fillStyle = answerOBJECT.color;
    ctx.font = "36px avenir";
    ctx.textAlign = "center";
    ctx.fillText(text, GAME.width / 2 - 10, GAME.height / 2);
}

function drawScore() {
    ctx.fillStyle = answerOBJECT.color;
    ctx.font = "bold 30px avenir";
    ctx.fillText("Score: " + MODEL.score, GAME.width / 2 - 60, GAME.height / 2 - 50);
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
    MODEL.x = answerOBJECT.width + 40;
    MODEL.y = canvasHeight - 115;
    forAnswersText.check = true;
}

function isTrue(x) {
    let state = forAnswersText.indexOfCorrectAnswer;
    if (x >= 480 && state === 3) {
        return true;
    } else if (x >= 320 && state === 2) {
        return true;
    } else if (x >= 160 && state === 1) {
        return true;
    } else if (x >= 0 && state === 0) {
        return true;
    }
    return false;
}

function moveAnswerBlocks() {
    // если блок с ответами соприкасается с блоком модельки
    if (answerOBJECT.y < GAME.height - MODEL.height + 20) {
        if (answerOBJECT.y >= MODEL.y - MODEL.height + 20) {
            let state = isTrue(MODEL.x);
            if (state === true) {
                // смещение главной модельки на исходное положение
                comeBackToStartPosition();
                // увеличение скорости моделек ответов
                increasingSpeed();
            } else {
                // отрисовка финального окна
                drawFinishGameScreen()
            }
        }
        answerOBJECT.y += answerOBJECT.speed;
    } else {
        answerOBJECT.y = 100;
    }
}

// end-------------------------------------

function main() {
    if (MODEL.score === forAnswersText.levels.length - 1) {
        drawFinishGameScreen()
    } else {
        initEventsListeners();
        drawGame();
        moveAnswerBlocks();
        requestAnimationFrame(main);
    }
}

main();