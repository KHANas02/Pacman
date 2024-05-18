let cols, rows;
let pacmans = [];
let size = 150;
let r = document.querySelector(":root");
let rs = getComputedStyle(r);
let bkg = rs.getPropertyValue("--bkg");
let pm = rs.getPropertyValue("--pacman");

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  cols = width / size;
  rows = height / size;
  let offset = size / 2;

  for (let i = 0; i < cols; i++) {
    pacmans[i] = [];
    for (let j = 0; j < rows; j++) {
      let startAngle;
      if (j % 2 == 0) {
        if (i % 2 == 0) {
          startAngle = 90;
        } else {
          startAngle = 180;
        }
      } else {
        if (i % 2 == 0) {
          startAngle = 0;
        } else {
          startAngle = 270;
        }
      }
      pacmans[i][j] = new Pacman(
        offset + i * size,
        offset + j * size,
        size,
        startAngle,
        pm
      );
    }
  }
}

function draw() {
  background(bkg);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      pacmans[i][j].display();
      pacmans[i][j].move();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Pacman {
    constructor(x, y, size, sa, clr) {
        this.x = x;
        this.y = y;
        this.sa = sa;
        this.clr = clr;
        this.ea = this.sa + 270;
        this.size = size;
        this.angle = 0;
        this.amt = 0;
    }

    easing(x) {
        return x === 0
            ? 0
            : x === 1
            ? 1
            : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
            : (2 - Math.pow(2, -20 * x + 10)) / 2;
    }

    display() {
        noStroke();
        fill(this.clr);
        arc(
            this.x, this.y, 
            this.size, this.size, 
            this.sa + this.angle, 
            this.ea + this.angle
        );
    }

    move() {
        if(this.amt > 1) {
            this.amt = 0;
        }
        else {
            this.amt += 0.0080;
        }
        this.angle = this.easing(this.amt) * 360;
    }
}

