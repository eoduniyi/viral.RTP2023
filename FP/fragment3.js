let img, img2, img3;

function preload() {
  img = loadImage("outputImages/out_7.png"); // Replace with the path to your image
  img2 = loadImage("outputImages/out_7.png");
  // img3 = loadImage("outputImages/out_7.png");
  // img3 = loadImage("images/bluesky_1/image-1.jpg")
  img3 = loadImage("outputImages/out_8.png");
}

function setup() {
  createCanvas(img.width, img.height);
  noStroke();
  imageMode(CENTER);
  noLoop();
}

function draw() {
  background(255);

  let tileSize = 5; // Size of the fragments (smaller tiles will create more fragments)
  let randomness = 50; // The higher the value, the more random the fragments' positions

  for (let y = 0; y < img.height; y += tileSize) {
    for (let x = 0; x < img.width; x += tileSize) {
      let offsetX = random(-randomness, randomness);
      let offsetY = random(-randomness, randomness);

      let sx = x + offsetX;
      let sy = y + offsetY;

      // Ensure the source position is within the image bounds
      sx = constrain(sx, 0, img.width - tileSize);
      sy = constrain(sy, 0, img.height - tileSize);

      // Copy a fragment from the image and draw it onto the canvas
      image(
        img,
        x + tileSize / 2,
        y + tileSize / 2,
        tileSize,
        tileSize,
        sx,
        sy,
        tileSize,
        tileSize
      );
    }
  }

  // Set the blend mode and draw the second image on top of the canvas
  blendMode(LIGHTEST); // You can experiment with different blend modes like ADD, SCREEN, etc.
  image(img2, width / 2, height / 2);

  blendMode(MULTIPLY);
  image(img3, width / 2, height / 2);
}
