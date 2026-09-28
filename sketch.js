const r = require("raylib");
const g = require("./geometry");
const p = require("./particle");

const WIDTH = 900;
const HEIGHT = 500;
const ALPHA = 0.5;

const scanWidth = 40;

// Scanner A
let xOfScanA = 0;
const scanALeftEdge = 0;
const scanARightEdge = WIDTH / 2 - scanWidth;
let velocityOfScanA = 4;

// Scanner B
let xOfScanB = WIDTH / 2;
const scanBLeftEdge = WIDTH / 2;
const scanBRightEdge = WIDTH - scanWidth;
let velocityOfScanB = 3;

// Scanner C
let yOfVertScan = 0;
const vertScanHeight = 40;
const vertScanLeftEdge = 0;
const vertScanRightEdge = HEIGHT - vertScanHeight;
let velocityOfVertScan = 5;

// Color of Scanner
let colorOfScanA;
let colorOfScanB;
let colorOfVertScan;

function setup() {
    const FPS = 60;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Particle Detector");
    r.SetTargetFPS(FPS);
}

function running() {
    return !r.WindowShouldClose();
}

function updateVelocities() {
    velocityOfScanA = g.calculateVelocity(xOfScanA, scanALeftEdge, scanARightEdge, velocityOfScanA);
    velocityOfScanB = g.calculateVelocity(xOfScanB, scanBLeftEdge, scanBRightEdge, velocityOfScanB);
    velocityOfVertScan = g.calculateVelocity(yOfVertScan, vertScanLeftEdge, vertScanRightEdge, velocityOfVertScan);
}

function moveScanners() {
    xOfScanA = g.moveScanner(xOfScanA, velocityOfScanA);
    xOfScanB = g.moveScanner(xOfScanB, velocityOfScanB);
    yOfVertScan = g.moveScanner(yOfVertScan, velocityOfVertScan);
}

function determineScannersColours() {
    colorOfScanA = g.isOverlapping(xOfScanA, scanWidth, p.xOfA, p.widthOfA, p.xOfB, p.widthOfB) ? r.ColorAlpha(r.RED, ALPHA) : r.WHITE;
    colorOfScanB = g.isOverlapping(xOfScanB, scanWidth, p.xOfA, p.widthOfA, p.xOfB, p.widthOfB) ? r.ColorAlpha(r.RED, ALPHA) : r.WHITE;
    colorOfVertScan = g.isOverlapping(yOfVertScan, vertScanHeight, p.yOfC, p.heightOfC) ? r.ColorAlpha(r.RED, ALPHA) : r.WHITE;
}

function update() {
    moveScanners();
    updateVelocities();
    determineScannersColours();
}

function drawParticles() {
    const particleHeight = HEIGHT;
    const vertParticleWidth = WIDTH;

    r.DrawRectangle(p.xOfA, p.particleY, p.widthOfA, particleHeight, r.SKYBLUE);
    r.DrawRectangle(p.xOfB, p.particleY, p.widthOfB, particleHeight, r.SKYBLUE);
    r.DrawRectangle(p.xOfVert, p.yOfC, vertParticleWidth, p.heightOfC, r.SKYBLUE);
}

function drawScanners() {
    const scanY = 0;
    const scanHeight = HEIGHT;
    const xOfVertScan = 0;
    const vertScanWidth = WIDTH;

    r.DrawRectangle(xOfScanA, scanY, scanWidth, scanHeight, colorOfScanA);
    r.DrawRectangle(xOfScanB, scanY, scanWidth, scanHeight, colorOfScanB);
    r.DrawRectangle(xOfVertScan, yOfVertScan, vertScanWidth, vertScanHeight, colorOfVertScan);
}

function draw() {
    r.BeginDrawing();

    r.ClearBackground(r.BLACK);

    drawParticles();
    drawScanners();

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};