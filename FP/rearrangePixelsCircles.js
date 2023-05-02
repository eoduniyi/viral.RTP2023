let img;
let randomImg;

const circleRadius = 50; // Define the radius of the circles that will be swapped

function preload() {
  // img = loadImage("images/bluesky_1/image-17.jpg"); // Replace with the path to your image
  // img = loadImage("images/testing/pieces_3.png"); // Replace with the path to your image
  // img = loadImage("images/testing/img_white+blue_1.jpg"); // Replace with the path to your image
  img = loadImage("outputImages/out_7.png");
}

function setup() {
  createCanvas(img.width, img.height);
  randomImg = createImage(img.width, img.height);
  randomImg.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height); // Copy the original image
  randomizeCircles();
}

function draw() {
  image(randomImg, 0, 0);
}

function randomizeCircles() {
  randomImg.loadPixels();

  const swapCount = 100; // Number of circular regions to swap
  for (let i = 0; i < swapCount; i++) {
    const x1 = floor(random(img.width - circleRadius * 2));
    const y1 = floor(random(img.height - circleRadius * 2));
    const x2 = floor(random(img.width - circleRadius * 2));
    const y2 = floor(random(img.height - circleRadius * 2));

    for (let y = -circleRadius; y < circleRadius; y++) {
      for (let x = -circleRadius; x < circleRadius; x++) {
        if (x * x + y * y <= circleRadius * circleRadius) {
          const index1 = (x1 + x + (y1 + y) * img.width) * 4;
          const index2 = (x2 + x + (y2 + y) * img.width) * 4;

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
