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
img_cloud.src = 'static/img/clouds.png';

const img_reload_button = new Image();
img_reload_button.src = 'static/img/reload.png';
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
    presentContinuous1: {
        question: "I am _ now.",
        correctAnswer: "working",
        allAnswers: shuffle(["working", "work", "works", "worked"]),
        theme: "Present Continuous",
    },
    presentContinuous2: {
        question: "Kate _ studying at the moment.",
        correctAnswer: "isn’t",
        allAnswers: shuffle(["isn’t", "doesn’t", "aren’t", "didn’t"]),
        theme: "Present Continuous",
    },
    presentContinuous3: {
        question: "What _ she watching now?",
        correctAnswer: "is",
        allAnswers: shuffle(["is", "does", "did", "has"]),
        theme: "Present Continuous",
    },
    presentContinuous4: {
        question: "I’m _ my clothes at the moment.",
        correctAnswer: "washing",
        allAnswers: shuffle(["washing", "wash", "washes", "washed"]),
        theme: "Present Continuous",
    },
    presentContinuous5: {
        question: "They _ to Rome next Monday.",
        correctAnswer: "are moving",
        allAnswers: shuffle(["are moving", "moved", "move", "moving"]),
        theme: "Present Continuous",
    },
    presentContinuous6: {
        question: "This tree _ so fast.",
        correctAnswer: "is growing",
        allAnswers: shuffle(["is growing", "grows", "growing", "is"]),
        theme: "Present Continuous",
    },
    pastContinuous1: {
        question: "I _ a book at 9 pm last night.",
        correctAnswer: "was reading",
        allAnswers: shuffle(["was reading", "reading", "read", "has read"]),
        theme: "Past Continuous",
    },
    pastContinuous2: {
        question: "This time last year he was _ in London.",
        correctAnswer: "living",
        allAnswers: shuffle(["living", "was living", "lived", "lives"]),
        theme: "Past Continuous",
    },
    pastContinuous3: {
        question: "She was driving home when I _ her.",
        correctAnswer: "saw",
        allAnswers: shuffle(["saw", "seen", "see", "am seeing"]),
        theme: "Past Continuous",
    },
    pastContinuous4: {
        question: "He was singing when I _ the room.",
        correctAnswer: "entered",
        allAnswers: shuffle(["entered", "enter", "am entering", "was enter"]),
        theme: "Past Continuous",
    },
    pastContinuous5: {
        question: "Sarah _ cooking when I called her.",
        correctAnswer: "wasn’t",
        allAnswers: shuffle(["wasn’t", "doesn’t", "didn’t", "isn’t"]),
        theme: "Past Continuous",
    },
    pastContinuous6: {
        question: "What were you _ there?",
        correctAnswer: "doing",
        allAnswers: shuffle(["doing", "do", "did", "done"]),
        theme: "Past Continuous",
    },
    presentPerfect1: {
        question: "They _ lived in Paris since 1996.",
        correctAnswer: "have",
        allAnswers: shuffle(["have", "has", "-", "had"]),
        theme: "Present Perfect",
    },
    presentPerfect2: {
        question: "We haven't _ Camille today.",
        correctAnswer: "seen",
        allAnswers: shuffle(["seen", "saw", "see", "seeing"]),
        theme: "Present Perfect",
    },
    presentPerfect3: {
        question: "Have you _ your project yet?",
        correctAnswer: "finished",
        allAnswers: shuffle(["finished", "finish", "finished", "finishing"]),
        theme: "Present Perfect",
    },
    presentPerfect4: {
        question: "I’ve _ five pages this morning.",
        correctAnswer: "written",
        allAnswers: shuffle(["written", "wrote", "write", "writing"]),
        theme: "Present Perfect",
    },
    presentPerfect5: {
        question: "She has finished _ serial this week.",
        correctAnswer: "watching",
        allAnswers: shuffle(["watching", "watched", "watch", "watches"]),
        theme: "Present Perfect",
    },
    presentPerfect6: {
        question: "I have _ Bratislava",
        correctAnswer: "been to",
        allAnswers: shuffle(["been to", "been in", "be to", "be in"]),
        theme: "Present Perfect",
    },
};

let levels_list = [
    QUESTIONS.presentSimple1, QUESTIONS.presentSimple2, QUESTIONS.presentSimple3,
    QUESTIONS.presentSimple4, QUESTIONS.presentSimple5, QUESTIONS.presentSimple6,
    QUESTIONS.pastSimple1, QUESTIONS.pastSimple2, QUESTIONS.pastSimple3,
    QUESTIONS.pastSimple4, QUESTIONS.pastSimple5, QUESTIONS.pastSimple6,
    QUESTIONS.futureSimple1, QUESTIONS.futureSimple2, QUESTIONS.futureSimple3,
    QUESTIONS.futureSimple4, QUESTIONS.futureSimple5, QUESTIONS.futureSimple6,
    QUESTIONS.presentContinuous1, QUESTIONS.presentContinuous2, QUESTIONS.presentContinuous3,
    QUESTIONS.presentContinuous4, QUESTIONS.presentContinuous5, QUESTIONS.presentContinuous6,
    QUESTIONS.pastContinuous1, QUESTIONS.pastContinuous2, QUESTIONS.pastContinuous3,
    QUESTIONS.pastContinuous4, QUESTIONS.pastContinuous5, QUESTIONS.pastContinuous6,
    QUESTIONS.presentPerfect1, QUESTIONS.presentPerfect2, QUESTIONS.presentPerfect3,
    QUESTIONS.presentPerfect4, QUESTIONS.presentPerfect5, QUESTIONS.presentPerfect6,
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
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

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
    return level;
}

// end-------------------------------------


// FUNCTIONS DRAW
// start-----------------------------------
function drawAnswerBlocks() {
    ctx.drawImage(answerOBJECT.pic, answerOBJECT.x, answerOBJECT.y, answerOBJECT.width + 20, answerOBJECT.height);
    ctx.drawImage(answerOBJECT.pic, answerOBJECT.x + answerOBJECT.width + answerOBJECT.offset, answerOBJECT.y, answerOBJECT.width + 20, answerOBJECT.height);
    ctx.drawImage(answerOBJECT.pic, answerOBJECT.x + (answerOBJECT.width + answerOBJECT.offset) * 2, answerOBJECT.y, answerOBJECT.width + 20, answerOBJECT.height);
    ctx.drawImage(answerOBJECT.pic, answerOBJECT.x + (answerOBJECT.width + answerOBJECT.offset) * 3, answerOBJECT.y, answerOBJECT.width + 20, answerOBJECT.height);
}

function drawMainModel() {
    ctx.drawImage(img_rocket, MODEL.x, MODEL.y, MODEL.width, MODEL.height);
    ctx.beginPath();
    ctx.moveTo(0, 99);
    ctx.lineTo(canvasWidth, 99);
    ctx.stroke();
    ctx.closePath();
}

function drawAnswerText() {
    let level = prepareToDrawAnswerText();
    ctx.beginPath();
    ctx.fillStyle = answerOBJECT.color;
    ctx.font = "18pt avenir";
    let start_x = answerOBJECT.x + 20;
    let y = answerOBJECT.y + answerOBJECT.height / 2 + 15;
    let up_level = answerOBJECT.width + answerOBJECT.offset;
    for (let i = 0; i < 4; i++) {
        if (level.allAnswers[i].length <= 2) {
            ctx.fillText(level.allAnswers[i], start_x + up_level * i + 30, y);
        }
        if (level.allAnswers[i].length <= 4 && level.allAnswers[i].length > 2) {
            ctx.fillText(level.allAnswers[i], start_x + up_level * i + 25, y);
        }
        if (level.allAnswers[i].length <= 6 && level.allAnswers[i].length > 4) {
            ctx.fillText(level.allAnswers[i], start_x + up_level * i + 10, y);
        }
        if (level.allAnswers[i].length <= 8 && level.allAnswers[i].length > 6) {
            ctx.fillText(level.allAnswers[i], start_x + up_level * i + 5, y);
        }
        if (level.allAnswers[i].length > 8) {
            ctx.fillText(level.allAnswers[i], start_x + up_level * i, y);
        }
    }
    ctx.closePath();
    return level;
}

function drawQuestionText() {
    let level = drawAnswerText();
    ctx.beginPath();
    ctx.fillStyle = "#1F2533";
    ctx.font = "bold 24pt avenir";
    ctx.fillText(level.question, 20, 60);
    ctx.closePath();
}

function drawFinishGameScreen() {
    let score_text = `Your score: ${MODEL.score}`;
    let themes_list = ['Present Simple', 'Past Simple', 'Future Simple', 'Present Continuous', 'Past Continuous', 'Present Perfect']
    ctx.beginPath();
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    ctx.fillStyle = '#000000';
    ctx.font = "bold 30px avenir";
    ctx.textAlign = "center";
    ctx.fillText('All themes:', GAME.width / 2 - 10, GAME.height / 2 - 300);

    ctx.fillStyle = '#3d3d3d';
    ctx.font = "italic 30px avenir";
    ctx.textAlign = "center";
    for (let i = 0; i < themes_list.length; i ++) {
        ctx.fillText(themes_list[i], GAME.width / 2 - 10, GAME.height / 2 - 250 + 40 * i);
    }

    ctx.fillStyle = '#000000';
    ctx.font = "bold 38px avenir";
    ctx.textAlign = "center";
    ctx.fillText('The training is over', GAME.width / 2 - 10, GAME.height / 2 + 50);

    ctx.fillStyle = '#0000CD';
    ctx.font = "bold 36px avenir";
    ctx.textAlign = "center";
    ctx.fillText(score_text, GAME.width / 2 - 10, GAME.height / 2 + 130);

    ctx.fillStyle = '#006400';
    ctx.font = "28px avenir";
    ctx.textAlign = "center";
    ctx.fillText("Let's go again", GAME.width / 2 - 10, GAME.height / 2 + 230);

    ctx.fillStyle = '#8B0000';
    ctx.font = "24px avenir";
    ctx.fillText("Click the button in the upper right corner ", GAME.width / 2 - 10, GAME.height / 2 + 280);
    ctx.closePath();
}

function drawScore() {
    ctx.beginPath();
    ctx.fillStyle = answerOBJECT.color;
    ctx.font = "bold 30px avenir";
    ctx.fillText("Score: " + MODEL.score, GAME.width / 2 - 60, GAME.height / 2 - 50);
    ctx.closePath();
}

function drawReloadButton() {
    img_reload_button.style.position = "absolute";
    img_reload_button.style.width = '50px';
    img_reload_button.style.height = '50px';
    img_reload_button.style.top = '4%';
    img_reload_button.style.left = '69%';
    img_reload_button.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(img_reload_button);

    img_reload_button.addEventListener('click', function () {
        window.location.reload();
    })
}

function drawGame() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawScore();
    drawAnswerBlocks();
    drawQuestionText();
    drawAnswerText();
    drawMainModel();
    drawReloadButton();
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
    if (answerOBJECT.y < GAME.height - MODEL.height + 15) {
        if (answerOBJECT.y >= MODEL.y - MODEL.height + 15) {
            let state = isTrue(MODEL.x);
            if (state === true) {
                // смещение главной модельки на исходное положение
                comeBackToStartPosition();
                // увеличение скорости моделек ответов
                increasingSpeed();
            } else {
                // отрисовка финального окна
                drawFinishGameScreen();
            }
        }
        answerOBJECT.y += answerOBJECT.speed;
    } else {
        answerOBJECT.y = 100;
    }
}

// end-------------------------------------

function main() {
    if (MODEL.score === 30) {
        drawFinishGameScreen();
    } else {
        initEventsListeners();
        drawGame();
        moveAnswerBlocks();
        requestAnimationFrame(main);
    }
}

main();