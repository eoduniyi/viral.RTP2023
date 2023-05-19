let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let DIM = Math.min(WIDTH, HEIGHT);
("use strict");
let fx = 0.008;
let fy = 0.075;
nw = 300;
let xs = 1;
let ys = 5; //blur noise
let seed;
let extraCanvas;
let ellipseCanvas;

let ellipseX = DIM / 2; // X position - center of the canvas
let ellipseY = DIM / 2; // Y position - center of the canvas
let ellipseWidth = DIM / 2; // Width - half of the canvas width
let ellipseHeight = DIM / 2; // Height - half of the canvas height

function setup() {
  createCanvas(DIM, DIM);
  nz = createGraphics(DIM, DIM);
  el = createGraphics(DIM, DIM);
  noStroke();
  seed = floor(random(256)); // GENERATES RANDOM SEED FOR NOISE
  noiseSeed(seed); // SET THIS TO USE HASH IN FINAL VERSION
  blendMode(ADD);
  console.log("DONE");
  noLoop();
}

function draw() {
  for (let y = 0; y < DIM; y += ys) {
    for (let x = 0; x <= DIM; x += xs) {
      fill(0 + noise(x * fx, y * fy) * nw, 120);
      rect(x, y, xs, ys);
    }
  }
  nz.background("#8AFF8A");
  nz.fill(0);
  nz.ellipse(ellipseX, ellipseY, ellipseWidth + 50, ellipseHeight + 50);
  image(nz, 5, 0);
  blendMode(BLEND);
  el.noStroke();
  el.fill("#B93E6B"); // Red color
  el.ellipse(ellipseX, ellipseY, ellipseWidth + 50, ellipseHeight + 50);
  blendMode(HARD_LIGHT);
  image(el, 15, 0);
}
