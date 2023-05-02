let img;
let randomImg;

const blockSize = 1000; // Define the size of the blocks that will be swapped

function preload() {
  img = loadImage("images/bluesky_1/image-1.jpg"); // Replace with the path to your image
}

function setup() {
  createCanvas(img.width, img.height);
  randomImg = createImage(img.width, img.height);
  randomizeBlocks();
}

function draw() {
  image(randomImg, 0, 0);
}

function randomizeBlocks() {
  img.loadPixels();
  randomImg.loadPixels();

  for (let y = 0; y < img.height; y += blockSize) {
    for (let x = 0; x < img.width; x += blockSize) {
      const randomX = floor(random(floor(img.width / blockSize))) * blockSize;
      const randomY = floor(random(floor(img.height / blockSize))) * blockSize;

      for (let i = 0; i < blockSize; i++) {
        for (let j = 0; j < blockSize; j++) {
          const index = (x + j + (y + i) * img.width) * 4;
          const randomIndex = (randomX + j + (randomY + i) * img.width) * 4;

          randomImg.pixels[index] = img.pixels[randomIndex];
          randomImg.pixels[index + 1] = img.pixels[randomIndex + 1];
          randomImg.pixels[index + 2] = img.pixels[randomIndex + 2];
          randomImg.pixels[index + 3] = img.pixels[randomIndex + 3];
        }
      }
    }
  }

  randomImg.updatePixels();
}
