let imgs = [];
let imgSquares = [];
let horizontalSquareCount = 4;
let verticalSquareCount = 1;
let squareWidth;
let squareHeight;
let lineSize = 10;

function preload() {
  imgs[0] = loadImage("outputImages/out_5.png");
  imgs[1] = loadImage("images/testing/pieces_1.png");
  imgs[2] = loadImage("outputImages/out_2.png");
  imgs[3] = loadImage("images/forests_1/image-1.jpg");
  imgs[4] = loadImage("images/forests_1/image-6.jpg");
  imgs[5] = loadImage("images/bluesky_1/image-19.jpg");
  // imgs[1] = loadImage("images/testing/img_white_1.jpg");
  // imgs[2] = loadImage("images/testing/img_white_1.jpg");
  // imgs[3] = loadImage("images/testing/img_white_1.jpg");
  // imgs[4] = loadImage("images/testing/img_white_1.jpg");
  // imgs[5] = loadImage("images/testing/pieces_4.png");
  // imgs[1] = loadImage("images/testing/img_white_1.jpg");
  // imgs[2] = loadImage("images/testing/big_block_1.png");
  // imgs[3] = loadImage("images/testing/big_block_1.png");
  // imgs[4] = loadImage("images/testing/img_white_1.jpg");
  // imgs[5] = loadImage("images/testing/img_white_1.jpg");
  // imgs[6] = loadImage("images/testing/img_white_1.jpg");
  // imgs[1] = loadImage("images/img_white_1.jpg");
  // imgs[2] = loadImage("images/img_dark_blue_1.jpg");
  // imgs[3] = loadImage("images/img_green_1.jpg");
  // imgs[4] = loadImage("images/img_green_1.jpg");
  // imgs[5] = loadImage("images/img_green_1.jpg");
  // imgs[6] = loadImage("images/img_white_1.jpg");
  // imgs[7] = loadImage("images/img_white_1.jpg");
}

function setup() {
  createCanvas(800, 600);

  // Resize the images so they fit on the screen
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].resize(width, height);
  }

  // Calculate the size of the squares.
  squareWidth = width / horizontalSquareCount;
  squareHeight = height / verticalSquareCount;

  // Split the images up into squares.
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].loadPixels();
    for (let y = 0; y < height; y += squareHeight) {
      for (let x = 0; x < width; x += squareWidth) {
        imgSquares.push(imgs[i].get(x, y, squareWidth, squareHeight));
      }
    }
  }

  // other setup
  pd = pixelDensity();
  noLoop();
}

// We called noLoop() above so the draw() function is only called once.
// Click the mouse to redraw the squares in a different order!
function mouseClicked() {
  draw();
}

function draw() {
  // Randomize the order of the squares for each image
  let start = 0;
  let end = imgSquares.length / imgs.length;
  for (let i = 0; i < imgs.length; i++) {
    let imgSquaresSubset = imgSquares.slice(start, end);
    imgSquaresSubset = shuffle(imgSquaresSubset);
    for (let j = 0; j < imgSquaresSubset.length; j++) {
      image(imgSquaresSubset[j], j * squareWidth, i * squareHeight);
    }
    start = end;
    end += imgSquares.length / imgs.length;
  }

  // Draw diagonal lines on top of the blended images
  for (let i = 0; i < 10000; i++) {
    drawOneLine();
  }
}

function drawOneLine() {
  let imgIndex = floor(random(imgs.length));
  let img = imgs[imgIndex];
  let x = random(img.width);
  let y = random(img.height);
  let pixelColor = img.get(x, y);
  stroke(pixelColor);
  fill(pixelColor);

  let r = random(1);

  let offset = 25; // The amount to offset the line from the center

  // Draw a diagonal line from top-right to bottom-left
  // line(x + offset, y - offset, x - offset, y + offset);

  stroke(pixelColor);

  // Draw lines in 4 directions
  if (r < 0.011) {
    // Draw a diagonal line from top-left to bottom-right
    // line(x + offset, y - offset, x - offset, y + offset);
    // Draw a diagonal line from top-left to bottom-right
    line(x - offset, y - offset, x + offset, y + offset);
  } else if (r < 0.5) {
    line(x, y - lineSize / 4, x, y + lineSize / 4);
  } else if (r < 0.95) {
    // Draw a diagonal line from top-right to bottom-left
    line(x + offset, y - offset, x - offset, y + offset);
  } else {
    // Draw a diagonal line from top-right to bottom-left
    line(x + offset, y - offset, x - offset, y + offset);
  }
}
