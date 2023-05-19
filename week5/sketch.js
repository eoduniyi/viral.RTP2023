let c, c2;
let areas = [];

function setup() {
  createCanvas(500, 700);

  // Set main and support color
  c = color(214, 214, 212);
  c2 = color(0);
  stroke(c);

  // Original areas
  areas = [
    [0, 20, width, 20],
    [width * 0.6, 40, width * 0.2, 8],
    [width * 0.4, 48, 64, 20],
    [width * 0.3, 68, width * 0.3, 8],
    [0, 76, width * 0.5, 8],
    [0, 84, width, 20],
    [width * 0.16, 104, width * 0.34, 20],
    [0, 124, width * 0.1, 8],
    [width * 0.34, 124, width * 0.16, 8],
    [0, 132, width, 100],
    [0, 260, width / 4, 8],
    [0, 268, width, 36],
    [0, 316, width, 30],
  ];
}

function draw() {
  drawComposition();
  drawVertLines();
}

function drawComposition() {
  // Reset background
  // background(255); // Cool effect when commented out

  // Run basic stripe pattern
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (y % 4 == 0 && x % 4 == 0) {
        set(x, y, c);
        set(x + 1, y, c);
      } else if (y % 4 == 1 && x % 4 == 1) {
        set(x, y, c);
        set(x + 1, y, c);
      } else if (y % 4 == 2 && x % 4 == 2) {
        set(x, y, c);
        set(x + 1, y, c);
      } else if (y % 4 == 3 && x % 4 == 3) {
        set(x, y, c);
        set(x + 1, y, c);
      }
    }
  }

  // Run random left striped pattern
  // Clear out other layer
  for (let a = 0; a < areas.length; a++) {
    for (let x = areas[a][0]; x < areas[a][0] + areas[a][2]; x++) {
      for (let y = areas[a][1]; y < areas[a][1] + areas[a][3]; y++) {
        if (y % 4 == 0 && x % 4 == 3) {
          set(x, y, c);
          set(x - 1, y, c);
        } else if (y % 4 == 1 && x % 4 == 2) {
          set(x, y, c);
          set(x - 1, y, c);
        } else if (y % 4 == 2 && x % 4 == 1) {
          set(x, y, c);
          set(x - 1, y, c);
        } else if (y % 4 == 3 && x % 4 == 0) {
          set(x, y, c);
          set(x - 1, y, c);
        } else {
          // Check what the pixel is and replace it
          if (red(get(x, y)) == 255) {
            set(x, y, color(255));
          } else if (color(get(x, y)).toString() == c2.toString()) {
            set(x, y, color(0));
          } else {
            set(x, y, color(255));
          }
        }
      }
    }
  }

  updatePixels();
}

function drawVertLines() {
  let lines = 30; // Fewer lines for more spacing
  let spacing = width / (lines + 1); // Calculate the spacing between each line
  let minY = height / 6; // Minimum y-coordinate for the start of the line
  let maxY = height / 4; // Maximum y-coordinate for the end of the line

  stroke(0); // Line color
  strokeWeight(5);

  for (let i = 0; i < lines; i++) {
    let x = (i + 1) * spacing; // x-coordinate of the line is determined by the line number and the spacing
    let yStart = random(minY, maxY); // Random y-coordinate within the specified range
    let yEnd = yStart + random(minY); // Random length, but not longer than maxY

    push(); // Save the current transformation matrix
    if (i % 2 == 1) {
      translate(0, random(height / 4)); // Push down the odd lines
      translate(0, random(height / 4)); // Push down the odd lines
      line(x, yStart / 4, x, yEnd / 4);
    }
    translate(0, random(height / 4)); // Push down the odd lines
    line(x, yStart, x, yEnd);
    pop(); // Restore the transformation matrix
  }
}
