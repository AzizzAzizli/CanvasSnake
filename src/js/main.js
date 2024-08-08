const canvas = document.querySelector("#canvas");
const score = document.querySelector(".score");
const ctx = canvas.getContext("2d");
const startBtn = document.querySelector(".startBtn");
const startDiv = document.querySelector(".start_pause");
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

// function initializeGame() {

//   x = Math.floor(gameSize / 2);
//   y = Math.floor(gameSize / 2);


//   body = [
//     { x: x - 1, y: y },
//     { x: x - 2, y: y },
//   ];

 
//   do {
//     eatX = Math.floor(Math.random() * gameSize);
//     eatY = Math.floor(Math.random() * gameSize);
//   } while (body.some((el) => el.x === eatX && el.y === eatY));

// }

// startBtn.addEventListener("click", () => {
//   initializeGame();
//   dx = 1;
//   startDiv.classList.add("none");
// });

function screenOptimization() {
  let currentScreen = window.screen.width;

  // console.log(currentScreen);

  if (currentScreen <= 550) {
    gameSize = 19;
  }
  if (currentScreen <= 450) {
    gameSize = 17;
  }
  if (currentScreen <= 370) {
    gameSize = 16;
  }
  if (currentScreen <= 330) {
    gameSize = 15;
  }
  canvas.width = Math.pow(gameSize, 2);
  canvas.height = Math.pow(gameSize, 2);
}

window.onload = screenOptimization();

window.addEventListener("resize", screenOptimization);

const interval = setInterval(Game, 100);

function Game() {
  ctx.fillStyle = "lime";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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
      bodySize = startBodySize;
      // startDiv.classList.remove("none");
      // startBtn.innerText = "Try Again";
      // // clearInterval(interval)
      // dx = 0;
      // dy = 0;
    }
  }
  while (body.length > bodySize) {
    body.shift();
  }

  ctx.fillStyle = "red";
  ctx.fillRect(eatX * gameSize, eatY * gameSize, gameSize - 2, gameSize - 2);
  if (eatX === x && eatY === y) {
    bodySize++;

    // eatX = Math.floor(Math.random() * gameSize);
    // eatY = Math.floor(Math.random() * gameSize);
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
  score.innerHTML = `${(bodySize - startBodySize) * 5}`;
  body.push({ x: x, y: y });
}

function ketPush(e) {
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
}

document.addEventListener("keydown", ketPush);
