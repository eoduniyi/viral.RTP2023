const fontSize = 20,
  scaleRate = 20,
  message = "A",
  inpactRange = 150;
let canvas;
let textData = [];
let textData2 = [];
let textData3 = [];
let dotsCordinate = [];
let dotsCordinate2 = [];
let dotsCordinate3 = [];
let particles = [];
let particles2 = [];
let particles3 = [];
let ACanvas;
let HelCanvas;

class Particle {
  constructor(x, y) {
    this.x = x * 2.5;
    this.y = y * 2.5;
    this.r = 2;
    this.originalX = x;
    this.originalY = y;
    this.density = Math.random() * 30 + 10;
  }

  draw() {
    text("helvetica", this.x, this.y, this.r * 2);
  }

  update() {
    if (distanceFromMouse < inpactRange) {
      // let repulsionAngle = Math.atan2(this.y - mouseY, this.x - mouseX);
      // let repulsionForce = (inpactRange - distanceFromMouse) / inpactRange * this.density; // < 1
      // this.x += Math.cos(repulsionAngle) * repulsionForce;
      // this.y += Math.sin(repulsionAngle) * repulsionForce;
      // this.x -= Math.cos(repulsionAngle) * repulsionForce;
      // this.y -= Math.sin(repulsionAngle) * repulsionForce;
    } else {
      // let attractionAngle = Math.atan2(this.originalY - this.y, this.originalX - this.x);
      // let attractionForce = Math.abs(distanceToOrigin) / this.density;
      // this.x += Math.cos(attractionAngle) * attractionForce;
      // this.y += Math.sin(attractionAngle) * attractionForce;
    }
    // if(this.x !== this.originalX){
    //     this.x += Math.cos(attractionAngle) * attractionForce;
    // }
    // if(this.y !== this.originalY){
    //     this.y += Math.sin(attractionAngle) * attractionForce;
    // }
  }
}

// **************************************

// function preload() {
// }

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  setup();
  draw();
}

function setup() {
  // frameRate(30);
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  ACanvas = createGraphics(window.innerWidth, window.innerHeight);
  TriCanvas = createGraphics(window.innerWidth, window.innerHeight);
  HelCanvas = createGraphics(window.innerWidth, window.innerHeight);
  // ACanvas.background(255,255,255,4)
  ACanvas.background("white");
  // HelCanvas.background("white")
  colorMode(HSL);
  noStroke();
  background("#fff");
  // frameRate(10);
  textSize(fontSize);
  textAlign(LEFT, TOP);
  textData = getTextData(message);
  textData2 = getTextData(message);
  textData3 = getTextData(message);
  // // console.log(textData);
  dotCordinate = getCordinates();
  dotCordinate2 = getCordinates2();
  dotCordinate3 = getCordinates3();
  particles = createParticles(scaleRate, 50, 50);
  particles2 = createParticles2(scaleRate, 57, 59);
  particles3 = createParticles3(scaleRate + 1, 45, 50);

  // console.log(dotsCordinate)
  // console.log(particles)
}

function draw() {
  // noLoop();
  image(ACanvas, 0, 0);

  image(HelCanvas, 0, 0);
  // ACanvas.fill(231, 219, 161,2);
  ACanvas.fill(209, 206, 191, 10);
  ACanvas.textSize(1000);
  ACanvas.textAlign(CENTER);
  // ACanvas.text("A", width/2+10, height/2 + 200)
  ACanvas.text("A", width / 2 + 10, height / 2 + 210);
  // HelCanvas.fill(231, 219, 161,63);
  HelCanvas.fill(209, 206, 191, 20);
  HelCanvas.textSize(1000);
  HelCanvas.textAlign(CENTER);
  HelCanvas.text("A", width / 2 + 10, height / 2 + 160);
  TriCanvas.noStroke();
  // TriCanvas.scale(0.5)
  // TriCanvas.triangle(30, 75, 58, 20, 86, 75);
  TriCanvas.triangle(30 * 5, 75 * 5, 59 * 5, 2 * 5, 86 * 5, 75 * 5);
  // background("#fff");
  // background(255);
  // background(0)
  // updating();
  image(TriCanvas, 190, 260);
  drawParticles();
  // filter(ERODE)
  drawParticles2();
  drawParticles3();
  filter(BLUR, 1);
}

function baseA() {
  textSize();
  textAlign(CENTER);
  text("A", width / 2, height / 2);
}

function getTextData(message) {
  const data = [];
  text(message, 0, 0); // draw once and get data
  for (let y = 0; y < textAscent(message); y++) {
    let row = [];
    for (let x = 0; x < textWidth(message); x++) {
      row.push(canvas.get(x, y)); // get data, [r, g, b, a]
    }
    data.push(row);
  }
  return data;
}

function getCordinates() {
  const cordinate = [];
  for (let y = 0; y < textData.length; y++) {
    let row = [];
    for (let x = 0; x < textData[0].length; x++) {
      let red = textData[y][x][0]; // the data equals [0, 0, 0, 255] or [255, 255,255, 255]. So pick up red value and judge
      if (red < 128) {
        // if < 128, regard the pixel as 'black'(1);
        row.push(1);
      } else {
        row.push(0);
      }
    }
    dotsCordinate.push(row);
  }
  return cordinate;
}

function getCordinates2() {
  const cordinate2 = [];
  for (let y = 0; y < textData2.length; y++) {
    let row = [];
    for (let x = 0; x < textData2[0].length; x++) {
      let red = textData2[y][x][0]; // the data equals [0, 0, 0, 255] or [255, 255,255, 255]. So pick up red value and judge
      if (red < 128) {
        // if < 128, regard the pixel as 'black'(1);
        row.push(1);
      } else {
        row.push(0);
      }
    }
    dotsCordinate2.push(row);
  }
  return cordinate2;
}

function getCordinates3() {
  const cordinate3 = [];
  for (let y = 0; y < textData3.length; y++) {
    let row = [];
    for (let x = 0; x < textData3[0].length; x++) {
      let red = textData3[y][x][0]; // the data equals [0, 0, 0, 255] or [255, 255,255, 255]. So pick up red value and judge
      if (red < 128) {
        // if < 128, regard the pixel as 'black'(1);
        row.push(1);
      } else {
        row.push(0);
      }
    }
    dotsCordinate3.push(row);
  }
  return cordinate3;
}

function createParticles(scaleRate, marginX, marginY) {
  const particles = [];
  for (let y = 0; y < dotsCordinate.length; y++) {
    for (let x = 0; x < dotsCordinate[0].length; x++) {
      if (dotsCordinate[y][x] === 1) {
        // let particle = new Particle(x * scaleRate + marginX, y * scaleRate + marginY);
        let particle = new Particle(
          x * scaleRate + marginX,
          y * scaleRate + marginY
        );
        particles.push(particle);
      }
    }
  }
  return particles;
}

function createParticles2(scaleRate, marginX, marginY) {
  const particles = [];
  for (let y = 0; y < dotsCordinate2.length; y++) {
    for (let x = 0; x < dotsCordinate2[0].length; x++) {
      if (dotsCordinate2[y][x] === 1) {
        // let particle = new Particle(x * scaleRate + marginX, y * scaleRate + marginY);
        let particle = new Particle(
          x * scaleRate + marginX,
          y * scaleRate + marginY
        );
        particles.push(particle);
      }
    }
  }
  return particles;
}

function createParticles3(scaleRate, marginX, marginY) {
  const particles = [];
  for (let y = 0; y < dotsCordinate3.length; y++) {
    for (let x = 0; x < dotsCordinate3[0].length; x++) {
      if (dotsCordinate3[y][x] === 1) {
        // let particle = new Particle(x * scaleRate + marginX, y * scaleRate + marginY);
        let particle = new Particle(
          x * scaleRate + marginX,
          y * scaleRate + marginY
        );
        particles.push(particle);
      }
    }
  }
  return particles;
}

function drawParticles() {
  particles.forEach((p) => {
    p.draw();
  });
}

function drawParticles2() {
  particles2.forEach((p) => {
    p.draw();
  });
}

function drawParticles3() {
  particles3.forEach((p) => {
    p.draw();
  });
}

function drawHelvetica() {
  text("helvetica", this.x, this.y);
}

function updating() {
  particles.forEach((p) => {
    // p.update();
  });
}
