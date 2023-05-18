let triangleLocations;
let numTriangles;
let minSideLength;
let maxSideLength;
let triangleColors;
let isAssembling = false;
let targetLocation;
let targetSideLength;
let isReassembling = false;
let animationDuration = 60; // Frames for each animation phase
let currentFrame = 0;
let mouseStoppedFrame = 0;
let mouseStoppedDelay = 60; // Delay frames after the mouse stops moving

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  background(0);
  resetTriangles();
}

function draw() {
  background(0);
  if (!isAssembling && !isReassembling) {
    updateTriangles();
  }
  if (isAssembling) {
    assembleTriangles();
  } else if (isReassembling) {
    reassembleTriangles();
  } else {
    for (let i = 0; i < numTriangles; i++) {
      let currentSideLength = map(
        i,
        0,
        numTriangles - 1,
        minSideLength,
        maxSideLength
      );
      let currentColor = triangleColors[i];
      let currentLocation = triangleLocations[i];
      drawEquilateralTriangle(currentLocation, currentSideLength, currentColor);
    }
  }
  currentFrame++;
  if (currentFrame >= animationDuration) {
    currentFrame = 0;
    if (
      !isAssembling &&
      !isReassembling &&
      currentFrame >= mouseStoppedFrame + mouseStoppedDelay
    ) {
      isAssembling = true;
    } else if (isAssembling) {
      isAssembling = false;
      isReassembling = true;
    } else if (isReassembling) {
      isReassembling = false;
      resetTriangles();
    }
  }
}

function resetTriangles() {
  numTriangles = floor(random(10, 20)); // Increase the range for more triangles
  minSideLength = 50;
  maxSideLength = min(width, height) * 0.5;
  triangleColors = [];
  triangleLocations = [];
  for (let i = 0; i < numTriangles; i++) {
    triangleColors.push(color(random(255), random(255), random(255)));
    let x = random(width);
    let y = random(height);
    triangleLocations.push(createVector(x, y));
  }
}

function updateTriangles() {
  if (mouseIsPressed) {
    let mouseXNormalized = mouseX / width;
    let mouseYNormalized = mouseY / height;
    for (let i = numTriangles - 1; i > 0; i--) {
      let prevLocation = triangleLocations[i - 1];
      let currentLocation = triangleLocations[i];
      currentLocation.x += (prevLocation.x - currentLocation.x) * 0.05;
      currentLocation.y += (prevLocation.y - currentLocation.y) * 0.05;
    }
    triangleLocations[0].x +=
      (mouseXNormalized * width - triangleLocations[0].x) * 0.1;
    triangleLocations[0].y +=
      (mouseYNormalized * height - triangleLocations[0].y) * 0.1;
    mouseStoppedFrame = currentFrame;
  }
}

function assembleTriangles() {
  if (!targetLocation) {
    targetLocation = createVector(width / 2, height / 2);
    targetSideLength = maxSideLength * 2;
  }

  for (let i = 0; i < numTriangles; i++) {
    let currentLocation = triangleLocations[i];
    let deltaX = (targetLocation.x - currentLocation.x) * 0.05;
    let deltaY = (targetLocation.y - currentLocation.y) * 0.05;
    currentLocation.x += deltaX;
    currentLocation.y += deltaY;
  }

  let distance = dist(
    targetLocation.x,
    targetLocation.y,
    triangleLocations[0].x,
    triangleLocations[0].y
  );
  if (distance < 5 && currentFrame >= mouseStoppedFrame + mouseStoppedDelay) {
    isAssembling = false;
    isReassembling = true;
  }

  for (let i = 0; i < numTriangles; i++) {
    let currentSideLength = map(
      i,
      0,
      numTriangles - 1,
      minSideLength,
      maxSideLength
    );
    let currentColor = triangleColors[i];
    let currentLocation = triangleLocations[i];
    drawEquilateralTriangle(currentLocation, currentSideLength, currentColor);
  }
}

function reassembleTriangles() {
  let initialSideLength =
    targetSideLength + (maxSideLength - minSideLength) / (numTriangles - 1);

  for (let i = 0; i < numTriangles; i++) {
    let currentLocation = triangleLocations[i];
    let deltaX = (width / 2 - currentLocation.x) * 0.05;
    let deltaY = (height / 2 - currentLocation.y) * 0.05;
    currentLocation.x += deltaX;
    currentLocation.y += deltaY;
  }

  let distance = dist(
    width / 2,
    height / 2,
    triangleLocations[0].x,
    triangleLocations[0].y
  );
  if (distance < 5) {
    isAssembling = true;
    isReassembling = false;
  }

  for (let i = 0; i < numTriangles; i++) {
    let currentSideLength = map(
      i,
      0,
      numTriangles - 1,
      initialSideLength,
      minSideLength
    );
    let currentColor = triangleColors[i];
    let currentLocation = triangleLocations[i];
    drawEquilateralTriangle(currentLocation, currentSideLength, currentColor);
  }
}

function drawEquilateralTriangle(location, sideLength, color) {
  const height = (Math.sqrt(3) / 2) * sideLength;
  const halfSideLength = sideLength / 2;
  stroke(color);
  noFill();
  push();
  translate(location.x, location.y);
  rotate(PI);
  beginShape();
  vertex(0, -height / 2);
  vertex(-halfSideLength, height / 2);
  vertex(halfSideLength, height / 2);
  endShape(CLOSE);
  pop();
}
