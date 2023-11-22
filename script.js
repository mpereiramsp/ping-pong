const canvasElement = document.querySelector("canvas");
const canvasContext = canvasElement.getContext("2d");

const gapX = 10;

const field = {
  w: window.innerWidth,
  h: window.innerHeight,
  draw: function () {
    canvasContext.fillStyle = "#286047";
    canvasContext.fillRect(0, 0, this.w, this.h);
  },
};

const centerLine = {
  w: 15,
  h: field.h,
  draw: function () {
    canvasContext.fillStyle = "#ffffff";
    canvasContext.fillRect(field.w / 2 - this.w / 2, 0, this.w, field.h);
  },
};

const leftPaddle = {
  x: gapX,
  y: 100,
  w: centerLine.w,
  h: 200,
  draw: function () {
    canvasContext.fillRect(this.x, this.y, this.w, this.h);
  },
};

const rightPaddle = {
  x: field.w - centerLine.w - gapX,
  y: 100,
  w: centerLine.w,
  h: 200,
  draw: function () {
    canvasContext.fillRect(this.x, this.h, this.w, this.h);
  },
};

const scoreBoard = {
  human: 1,
  pc: 2,
  draw: function () {
    canvasContext.font = "bold 72px Arial";
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "top";
    canvasContext.fillStyle = "#01341D";
    canvasContext.fillText(this.human, field.w / 4, 50);
    canvasContext.fillText(this.pc, field.w / 4 + field.w / 2, 50);
  },
};

const ball = {
  x: 300,
  y: 200,
  r: 20,
  draw: function () {
    canvasContext.fillStyle = "#ffffff";
    canvasContext.beginPath();
    canvasContext.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    canvasContext.fill();
  },
};

function setup() {
  canvasElement.width = canvasContext.width = field.w;
  canvasElement.height = canvasContext.height = field.h;
}

function draw() {
  field.draw();
  centerLine.draw();
  leftPaddle.draw();
  rightPaddle.draw();
  scoreBoard.draw();
  ball.draw();
}

setup();
draw();