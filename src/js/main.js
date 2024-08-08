const canvas = document.querySelector("#canvas");
const score = document.querySelector(".score");
const ctx = canvas.getContext("2d");

let x = 10;
let y = 10;

let dx = 0;
let dy = 0;

let gameSize = 20;

let eatX = 15;
let eatY = 15;

let body = [];
let bodySize = 2;
let startBodySize = 2;

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
  }
  while (body.length > bodySize) {
    body.shift();
  }
  ctx.fillStyle = "red";
  ctx.fillRect(eatX * gameSize, eatY * gameSize, gameSize - 2, gameSize - 2);
    if (eatX === x && eatY === y) {
        bodySize++;
    eatX = Math.floor(Math.random() * gameSize);
    eatY = Math.floor(Math.random() * gameSize);
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
  score.innerHTML = `${(bodySize - startBodySize)*5}`;
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

const interval = setInterval(Game, 500);
document.addEventListener("keydown", ketPush);
