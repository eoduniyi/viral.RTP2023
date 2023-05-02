const imagePaths = [
  // 'images/bluesky_1/image-1.jpg',
  // 'images/bluesky_1/image-2.jpg',
  // "images/bluesky_1/image-3.jpg",
  // 'images/bluesky_1/image-4.jpg',
  // "images/bluesky_1/image-5.jpg",
  // "images/bluesky_1/image-6.jpg",
  // "images/bluesky_1/image-3.jpg",
  // "images/bluesky_1/image-3.jpg",
  // "images/bluesky_1/image-19.jpg",
  // 'images/city_lights_1/image-1.jpg',
  // 'images/city_lights_1/image-2.jpg',
  // 'images/clouds_1/image-1.jpg',
  // 'images/clouds_1/image-2.jpg',
  // 'images/clouds_1/image-3.jpg',
  // 'images/clouds_1/image-4.jpg',
  // 'images/clouds_1/image-1.jpg',
  // "images/clouds_1/image-2.jpg",
  // 'images/clouds_1/image-3.jpg',
  // 'images/clouds_1/image-4.jpg',
  // "images/forests_1/image-1.jpg",
  // 'images/forests_1/image-2.jpg'
  // "images/forests_1/image-6.jpg",
  "outputImages/out_3.png",
  // Add more image paths as needed
];

let images = [];
let compositeImage;
let randomImg;

const circleRadius = 300; // Define the radius of the circles that will be swapped
const gridCols = 2; // Define the number of columns in the grid
const gridRows = 2; // Define the number of rows in the grid

function preload() {
  for (const imagePath of imagePaths) {
    images.push(loadImage(imagePath));
  }
}

function setup() {
  createCanvas(800, 600); // Set the canvas size according to your preference
  compositeImage = createGraphics(800, 800); // Set the composite image size to match the canvas size
  randomImg = createImage(800, 800); // Set the random image size to match the canvas size

  // Draw all the images onto the composite image in a grid
  let idx = 0;
  const imgWidth = compositeImage.width / gridCols;
  const imgHeight = compositeImage.height / gridRows;
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      if (idx < images.length) {
        compositeImage.image(
          images[idx],
          col * imgWidth,
          row * imgHeight,
          imgWidth,
          imgHeight
        );
        idx++;
      }
    }
  }

  // Copy the composite image to the random image and apply the random circular region swaps
  randomImg.copy(
    compositeImage,
    0,
    0,
    compositeImage.width,
    compositeImage.height,
    0,
    0,
    randomImg.width,
    randomImg.height
  );
  randomizeCircles();
}

function draw() {
  // background(233)
  image(randomImg, 0, 0);
}

function randomizeCircles() {
  randomImg.loadPixels();

  const swapCount = 10; // Number of circular regions to swap
  for (let i = 0; i < swapCount; i++) {
    const x1 = floor(random(randomImg.width - circleRadius * 2));
    const y1 = floor(random(randomImg.height - circleRadius * 2));
    const x2 = floor(random(randomImg.width - circleRadius * 2));
    const y2 = floor(random(randomImg.height - circleRadius * 2));

    for (let y = -circleRadius; y < circleRadius; y++) {
      for (let x = -circleRadius; x < circleRadius; x++) {
        if (x * x + y * y <= circleRadius * circleRadius) {
          const index1 = (x1 + x + (y1 + y) * randomImg.width) * 4;
          const index2 = (x2 + x + (y2 + y) * randomImg.width) * 4;

          const temp = {
            r: randomImg.pixels[index1],
            g: randomImg.pixels[index1 + 1],
            b: randomImg.pixels[index1 + 2],
            a: randomImg.pixels[index1 + 3],
          };

          randomImg.pixels[index1] = randomImg.pixels[index2];
          randomImg.pixels[index1 + 1] = randomImg.pixels[index2 + 1];
          randomImg.pixels[index1 + 2] = randomImg.pixels[index2 + 2];
          randomImg.pixels[index1 + 3] = randomImg.pixels[index2 + 3];

          randomImg.pixels[index2] = temp.r;
          randomImg.pixels[index2 + 1] = temp.g;
          randomImg.pixels[index2 + 2] = temp.b;
          randomImg.pixels[index2 + 3] = temp.a;
        }
      }
    }
  }

  randomImg.updatePixels();
}
