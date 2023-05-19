let x,
  y,
  z,
  width = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  createCanvas(800, 800);
}

function draw() {
  // Set the background color [black]
  background(255);

  // Set the square in the center...
  rectMode(CENTER);

  noFill();

  // Recreation 1
  rect(windowWidth / 2 + 4, windowHeight / 2, width + 10, width + 10);
  for (let i = 0; i < 19; i++) {
    width = map(i, 0, 1, 10, 20);
    let rand = random(width);
    rect(width / 2, height / 2, width);
    rect(windowWidth / 2, windowHeight / 2, width + rand, width);
  }
}
