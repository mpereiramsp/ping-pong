const canvasElement = document.querySelector("canvas");
const canvasContext = canvasElement.getContext("2d");

const gapX = 10;
const mouse = { x: 0, y: 0 };

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
  y: 0,
  w: centerLine.w,
  h: 200,
  _move: function () {
    this.y = mouse.y - this.h / 2;
  },
  draw: function () {
    canvasContext.fillStyle = "#ffffff";
    canvasContext.fillRect(this.x, this.y, this.w, this.h);

    this._move();
  },
};

const rightPaddle = {
  x: field.w - centerLine.w - gapX,
  y: 1,
  w: centerLine.w,
  h: 200,
  speed: 2,
  resetSpeed: function () {
    this.speed = 2;
  },
  speedUp: function () {
    this.speed += 0.5;
  },
  _move: function () {
    if (this.y + this.h / 2 < ball.y + ball.r) {
      this.y += this.speed;
    } else {
      this.y -= this.speed;
    }
  },
  draw: function () {
    canvasContext.fillStyle = "#ffffff";
    canvasContext.fillRect(this.x, this.y, this.w, this.h);
    this._move();
  },
};

const scoreBoard = {
  human: 0,
  pc: 0,
  increaseHuman: function () {
    this.human++;
  },
  increasePc: function () {
    this.pc++;
  },
  resetPoints: function () {
    this.human = 0;
    this.pc = 0;
  },
  draw: function () {
    canvasContext.font = "bold 72px Arial";
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "top";
    canvasContext.fillStyle = "#01341D";
    canvasContext.fillText(this.human, field.w / 4, 50);
    canvasContext.fillText(this.pc, field.w / 1.32, 50);
  },
};

const ball = {
  x: 50,
  y: 50,
  r: 20,
  speed: 3,
  directionX: 1,
  directionY: 1,
  _calcPosition: function () {
    if (
      (this.y - this.r < 0 && this.directionY < 0) ||
      (this.y > field.h - this.r && this.directionY > 0)
    ) {
      this._reverseY();
    }
    if (this.x > field.w - this.r - rightPaddle.w - gapX) {
      if (
        this.y + this.r > rightPaddle.y &&
        this.y - this.r < rightPaddle.y + rightPaddle.h
      ) {
        this._reverseX();
      } else {
        scoreBoard.increaseHuman();
        this._pointUp();
      }
    }

    if (this.x < this.r + leftPaddle.w + gapX) {
      if (
        this.y + this.r > leftPaddle.y &&
        this.y - this.r < leftPaddle.y + leftPaddle.h
      ) {
        this._reverseX();
      } else {
        scoreBoard.increasePc();
        this._pointUp();
      }
    }
  },
  _reverseX: function () {
    this.directionX = this.directionX * -1;
  },
  _reverseY: function () {
    this.directionY = this.directionY * -1;
  },
  _speedUp: function () {
    this.speed += 0.7;
  },
  _resetBallSpeed: function () {
    this.speed = 3;
  },
  _pointUp: function () {
    this.x = field.w / 2;
    this.y = field.h / 2;

    this._speedUp();
    rightPaddle.speedUp();
  },
  _winner: function () {
    if (scoreBoard.human == 13) {
      alert("Parabéns! Você ganhou!!!");
      this._resetBallSpeed();
      rightPaddle.resetSpeed();
      scoreBoard.resetPoints();
    }
    if (scoreBoard.pc == 13) {
      alert("Que pena, você perdeu.");
      this._resetBallSpeed();
      rightPaddle.resetSpeed();
      scoreBoard.resetPoints();
    }
  },
  _move: function () {
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;
  },
  draw: function () {
    canvasContext.fillStyle = "#ffffff";
    canvasContext.beginPath();
    canvasContext.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    canvasContext.fill();

    this._calcPosition();
    this._move();
    this._winner();
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

window.animateFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function main() {
  animateFrame(main);
  draw();
}

setup();
main();

canvasElement.addEventListener("mousemove", function (e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
});
