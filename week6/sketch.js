let img = []; // Declare array 'img'.

function preload() {
  for (let i = 0; i < 25; i++) {
    img[i] = loadImage("images/image" + i + ".jpg"); // Load the image files
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  stroke(0);
  noFill();
  const margin = 10;
  const squareSize = (width - margin * 6) / 5;
  const imageSize = squareSize - margin * 2;

  let imgIndex = 0; // variable to keep track of the image index
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const x = i * (squareSize + margin) + margin + squareSize / 2;
      const y = j * (squareSize + margin) + margin + squareSize / 2;
      imageMode(CENTER);
      if (imgIndex < img.length) {
        // check if there are more images to show
        filter(POSTERIZE, 10);
        image(img[imgIndex++], x, y, imageSize, imageSize); // Draw the image at the center of the square with specified size
      }
      rect(x, y, squareSize, squareSize); // Draw the rectangle around the image
    }
  }
}
