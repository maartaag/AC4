let mic, amp;
let audioStarted = false;
let demoMode = false;
let v = 0;

let rot = 0;
let rotSpeed = 0.2;
let maxVol = 0.01;

let axiom = "FX";
let rules = { X: "X+YF+", Y: "-FX-Y" };

let psyduckImg, psyduckBall;
let paletteIndex = 0;
let palettes = [
  ["#00bfff", "#ff006e"], // blau → rosa
  ["#00ff88", "#ff0040"], // verd → vermell
  ["#ffd60a", "#8338ec"], // groc → violeta
];

function preload() {
  // Carrega les imatges (posa els paths correctes)
  psyduckImg = loadImage("psyduck.png");
  psyduckBall = loadImage("psyduck_ball.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  select("#startBtn").mousePressed(startMic);
  select("#stopBtn").mousePressed(stopMic);
  select("#demoBtn").mousePressed(() => {
    demoMode = !demoMode;
    audioStarted = demoMode ? true : audioStarted;
  });
  select("#paletteBtn").mousePressed(() => {
    paletteIndex = (paletteIndex + 1) % palettes.length;
  });
}

async function startMic() {
  await userStartAudio();
  mic = new p5.AudioIn();
  mic.start(() => {
    amp = new p5.Amplitude();
    amp.setInput(mic);
    audioStarted = true;
    demoMode = false;
  });
}

function stopMic() {
  if (mic) mic.stop();
  audioStarted = false;
}

function draw() {
  if (!audioStarted) {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Haz CLICK en Start Mic o Demo Mode", width / 2, height / 2);
    return;
  }

  background(0);

  let volume = demoMode ? noise(frameCount * 0.01) * 0.05 : amp.getLevel();
  maxVol = max(maxVol * 0.995, volume);
  let raw = constrain(volume / maxVol, 0, 1);
  v = lerp(v, raw, 0.1);

  let iterations = int(lerp(8, 12, v));
  let segLength = lerp(6, 12, v);
  let angleShift = lerp(0, 40, v);

  let seq = generate(iterations);

  push();
  translate(width / 2, height / 2);

  rot += rotSpeed + v * 0.5;
  rotate(rot);

  strokeWeight(2);
  let colA = color(palettes[paletteIndex][0]);
  let colB = color(palettes[paletteIndex][1]);
  stroke(lerpColor(colA, colB, v));

  // Dibuixa bola Psyduck al centre
  imageMode(CENTER);
  image(psyduckBall, 0, 0, 60, 60);

  let angle = 0;
  for (let c of seq) {
    if (c === "F") {
      let x2 = segLength * cos(angle + angleShift);
      let y2 = segLength * sin(angle + angleShift);
      line(0, 0, x2, y2);
      translate(x2, y2);
    } else if (c === "+") angle += 90;
    else if (c === "-") angle -= 90;
  }
  pop();

  drawVolBar(v);

  // Easter egg: Psyduck quan volum a tope
  if (v > 0.95) {
    imageMode(CENTER);
    image(psyduckImg, width / 2, height / 2, 200, 200);
  }
}

function generate(n) {
  let s = axiom;
  for (let i = 0; i < n; i++) {
    let next = "";
    for (let c of s) next += rules[c] || c;
    s = next;
  }
  return s;
}

function drawVolBar(v) {
  let fillDiv = select("#volFill");
  if (fillDiv) {
    fillDiv.style("width", v * 100 + "%");
    // opcional: canviar color segons paleta
    let colA = color(palettes[paletteIndex][0]);
    let colB = color(palettes[paletteIndex][1]);
    fillDiv.style(
      "background",
      `linear-gradient(90deg, ${colA.toString()}, ${colB.toString()})`
    );
  }
}
