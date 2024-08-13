const canvas = document.querySelector("#canvas");
const score = document.querySelector(".score");
const ctx = canvas.getContext("2d");
const startBtn = document.querySelector(".startBtn");
const startDiv = document.querySelector(".start_pause");
const endScore = document.querySelector("#endScore");
const arrows = document.querySelectorAll(".arrowBtn");

let gameSize = 20;

let x = gameSize - 10;
let y = gameSize - 10;

let dx = 0;
let dy = 0;

let eatX = gameSize - 15;
let eatY = gameSize - 15;

let body = [];
let bodySize = 2;
let startBodySize = 2;

let interval;
let isStarted = false;

let yourScore = 0;

let movementCompleted = true;

let gamePaused = false;

function initializeGame() {
  yourScore = 0;
  ctx.fillStyle = "lime";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  x = Math.floor(gameSize / 2);
  y = Math.floor(gameSize / 2);

  body = [
    { x: x - 2, y: y },
    { x: x - 1, y: y },
    { x: x, y: y },
  ];

  ctx.fillStyle = "black";
  for (let i = 0; i < body.length; i++) {
    ctx.fillRect(
      body[i].x * gameSize,
      body[i].y * gameSize,
      gameSize - 2,
      gameSize - 2
    );
  }
  ctx.fillStyle = "red";
  do {
    eatX = Math.floor(Math.random() * gameSize);
    eatY = Math.floor(Math.random() * gameSize);
  } while (body.some((el) => el.x === eatX && el.y === eatY));
  ctx.fillRect(eatX * gameSize, eatY * gameSize, gameSize - 2, gameSize - 2);
}

initializeGame();
function screenOptimization() {
  let currentScreen = window.screen.width;

  // console.log(currentScreen);

  if (currentScreen <= 550) {
    gameSize = 19;
    startDiv.style.width = `${Math.pow(gameSize, 2) + 1}px `;
    startDiv.style.height = `${Math.pow(gameSize, 2) + 1}px `;
  }
  if (currentScreen <= 450) {
    gameSize = 17;
    startDiv.style.width = `${Math.pow(gameSize, 2) + 1}px `;
    startDiv.style.height = `${Math.pow(gameSize, 2) + 1}px `;
  }
  if (currentScreen <= 370) {
    gameSize = 16;
    startDiv.style.width = `${Math.pow(gameSize, 2) + 1}px `;
    startDiv.style.height = `${Math.pow(gameSize, 2) + 1}px `;
  }
  if (currentScreen <= 330) {
    gameSize = 15;
    startDiv.style.width = `${Math.pow(gameSize, 2) + 1}px `;
    startDiv.style.height = `${Math.pow(gameSize, 2) + 1}px `;
  }
  canvas.width = Math.pow(gameSize, 2);
  canvas.height = Math.pow(gameSize, 2);

  ctx.fillStyle = "lime";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.onload = screenOptimization();

window.addEventListener("resize", screenOptimization);

function clearOldTail() {
  if (body.length > bodySize + 2) {
    let tail = body.shift();
    ctx.fillStyle = "lime";
    ctx.fillRect(
      tail.x * gameSize,
      tail.y * gameSize,
      gameSize - 2,
      gameSize - 2
    );
  }
}

function Game() {
  // ctx.fillStyle = "lime";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  x += dx;
  y += dy;

  ctx.fillStyle = "black";
  for (let i = 0; i < body.length; i++) {
    ctx.fillRect(
      body[i].x * gameSize,
      body[i].y * gameSize,
      gameSize - 2,
      gameSize - 2
    );

    if (body[i].x === x && body[i].y === y) {
      // console.log(body, x, y);

      bodySize = startBodySize;
      startDiv.classList.remove("none");
      startBtn.innerText = "Try Again";
      isStarted = false;
      dx = 0;
      dy = 0;
      endScore.innerText = `Your score: ${yourScore}`;
      clearInterval(interval);
    }
  }

  // while (body.length > bodySize) {
  //   body.shift();
  // }

  ctx.fillStyle = "red";
  ctx.fillRect(eatX * gameSize, eatY * gameSize, gameSize - 2, gameSize - 2);
  if (eatX === x && eatY === y) {
    bodySize++;
    score.innerHTML = `${(bodySize - startBodySize) * 5}`;
    yourScore = (bodySize - startBodySize) * 5;

    do {
      eatX = Math.floor(Math.random() * gameSize);
      eatY = Math.floor(Math.random() * gameSize);
    } while (body.some((el) => el.x === eatX && el.y === eatY));
  }

  if (x < 0) {
    x = gameSize - 1;
  } else if (x > gameSize - 1) {
    x = 0;
  } else if (y < 0) {
    y = gameSize - 1;
  } else if (y > gameSize - 1) {
    y = 0;
  }

  body.push({ x: x, y: y });

  clearOldTail();

  movementCompleted = true;
}

function keyPush(e) {
  // console.log(e);

  if (!isStarted || !movementCompleted) {
    return;
  }
  if (e.keyCode === 37 && dx !== 1) {
    dx = -1;
    dy = 0;
  } else if (e.keyCode === 38 && dy !== 1) {
    dx = 0;
    dy = -1;
  } else if (e.keyCode === 39 && dx !== -1) {
    dx = 1;
    dy = 0;
  } else if (e.keyCode === 40 && dy !== -1) {
    dx = 0;
    dy = 1;
  }
  movementCompleted = false;
}
function StartGame() {
  dx = 1;
  dy = 0;
  isStarted = true;
  initializeGame();
  interval = setInterval(Game, 80);

  startDiv.classList.add("none");
}
startBtn.addEventListener("click", StartGame);
canvas.addEventListener("click", () => {
  if (gamePaused) {
    interval = setInterval(Game, 80);
    gamePaused = false;
    return;
  }
  if (!gamePaused) {
    clearInterval(interval);
    gamePaused = true;
    return;
  }
});
document.addEventListener("keydown", keyPush);

arrows.forEach((arrow, i) => {
  arrow.addEventListener("click", () => {
    // console.log(arrow.dataset.keycode);
    let e = {
      keyCode: +arrow.dataset.keycode,
    };
    keyPush(e);
  });
});
