let video;
let webcam;
let prevWebcamFrame;
let bars = [];
let barDuration = 3000; // Duration for bars to stay on the screen in milliseconds

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Video
  video = createVideo("tenderloin2.mp4", videoReady);
  video.size(width, height);
  video.hide();

  // Webcam
  webcam = createCapture(VIDEO);
  webcam.size(width, height);
  webcam.hide();

  // Initialize prevWebcamFrame to store the previous frame
  prevWebcamFrame = createImage(width, height);
  prevWebcamFrame.copy(webcam, 0, 0, width, height, 0, 0, width, height);
}

function videoReady() {
  video.loop();
}

function draw() {
  background(255);
  video.loadPixels();
  image(video, 0, 0, width, height); // Always display the current video frame
  pixelVideoWebcamControlled();
}

function pixelVideoWebcamControlled() {
  let movementThreshold = 100;
  let columnWidth = video.width / 50; // Width of each column

  webcam.loadPixels();
  prevWebcamFrame.loadPixels();

  push();
  translate(width, 0);
  scale(-1, 1); // Flip webcam feed
  for (let y = 0; y < webcam.height; y++) {
    for (let x = 0; x < webcam.width; x++) {
      let index = (y * webcam.width + x) * 4;
      let r1 = webcam.pixels[index];
      let r2 = prevWebcamFrame.pixels[index];

      let diff = abs(r1 - r2);

      if (diff > movementThreshold) {
        let columnStart = floor(x / columnWidth) * columnWidth;

        // Copy a flipped column of the video frame
        image(
          video,
          columnStart,
          0,
          columnWidth,
          video.height,
          columnStart + columnWidth,
          0,
          -columnWidth,
          video.height
        );

        // Add this bar to the array with the current time and position
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

  // Update prevWebcamFrame with the current frame
  prevWebcamFrame.copy(webcam, 0, 0, width, height, 0, 0, width, height);

  // Remove bars that have been on the screen for more than barDuration milliseconds
  bars = bars.filter((bar) => millis() - bar.startTime < barDuration);

  // Display the remaining bars
  bars.forEach((bar) => {
    image(
      video,
      bar.columnStart,
      0,
      bar.columnWidth,
      video.height,
      bar.columnStart + bar.columnWidth,
      0,
      -bar.columnWidth,
      video.height
    );
  });
}
