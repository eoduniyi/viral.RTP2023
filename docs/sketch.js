let video;
let webcam;
let prevWebcamFrame;
let accumulatedImage;

// New: Bar data array and bar duration
let bars = [];
let barDuration = 1000; // Duration in milliseconds

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Video
  video = createVideo("tenderloin.mp4", videoReady);
  video.size(width, height);
  video.hide();

  // Webcam
  webcam = createCapture(VIDEO);
  webcam.size(width, height);
  webcam.hide();

  // Initialize prevWebcamFrame to store the previous frame
  prevWebcamFrame = createImage(width, height);
  prevWebcamFrame.copy(webcam, 0, 0, width, height, 0, 0, width, height);

  // Initialize accumulatedImage to store the flipped columns
  accumulatedImage = createImage(width, height);
  accumulatedImage.copy(video, 0, 0, width, height, 0, 0, width, height);
}

function videoReady() {
  video.loop();
}

function draw() {
  background(255);
  pixelVideoWebcamControlled();

  // New: Check bar durations and reset if necessary
  let currentTime = millis();
  for (let i = bars.length - 1; i >= 0; i--) {
    let bar = bars[i];
    if (currentTime - bar.startTime > barDuration) {
      // Reset this part of accumulatedImage back to the original video
      accumulatedImage.copy(
        video,
        bar.columnStart,
        0,
        bar.columnWidth,
        height,
        bar.columnStart,
        0,
        bar.columnWidth,
        height
      );
      bars.splice(i, 1); // Remove this bar from the array
    }
  }
}

function pixelVideoWebcamControlled() {
  let movementThreshold = 100;
  let columnWidth = video.width / 50; // Width of each column

  // Mirror the webcam feed horizontally
  webcam.loadPixels();
  prevWebcamFrame.loadPixels();

  // Display the non-pixelated video
  image(video, 0, 0, width, height);

  video.loadPixels();
  accumulatedImage.loadPixels();
  push();
  translate(width, 0);
  scale(-1, 1);
  for (let y = 0; y < webcam.height; y++) {
    for (let x = 0; x < webcam.width; x++) {
      let index = (y * webcam.width + x) * 4;
      let r1 = webcam.pixels[index];
      let r2 = prevWebcamFrame.pixels[index];

      let diff = abs(r1 - r2);

      if (diff > movementThreshold) {
        let columnStart = floor(x / columnWidth) * columnWidth;

        // Copy a flipped column of the video frame to accumulatedImage
        accumulatedImage.copy(
          video,
          columnStart + columnWidth,
          0,
          -columnWidth,
          video.height,
          columnStart,
          0,
          columnWidth,
          video.height
        );

        // New: Add this bar to the array with the current time and position
        bars.push({
          startTime: millis(),
          columnStart: columnStart,
          columnWidth: columnWidth,
        });

        break; // Move to the next column
      }
    }
  }
  pop();

  // Display the accumulatedImage on top of the video
  image(accumulatedImage, 0, 0, width, height);

  // Update prevWebcamFrame with the current frame
  prevWebcamFrame.copy(webcam, 0, 0, width, height, 0, 0, width, height);
}
