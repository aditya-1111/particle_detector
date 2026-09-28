const r = require("raylib");
const g = require("./geometry");

const WIDTH = 900;
const HEIGHT = 500;
const ALPHA = 0.5;

const scanWidth = 40;

// Scanner A
let xOfScanA = 0;
const scanALeftEdge = 0;
const scanARightEdge = WIDTH / 2 - scanWidth;

// Scanner B
let xOfScanB = WIDTH / 2;
const scanBLeftEdge = WIDTH / 2;
const scanBRightEdge = WIDTH - scanWidth;

// Scanner C
let yOfVertScan = 0;
const vertScanHeight = 40;
const vertScanLeftEdge = 0;
const vertScanRightEdge = HEIGHT - vertScanHeight;

// Velocity of Scanner
let velocityOfScanA;
let velocityOfScanB;
let velocityOfVertScan;

// Particle A
const xOfParticleA = 320;
const widthOfParticleA = 130;

// Particle B
const xOfParticleB = 600;
const widthOfParticleB = 20;

// Particle C
const yOfParticleC = 350;
const heightOfParticleC = 20;

function setup() {
    const FPS = 60;

    velocityOfScanA = 4;
    velocityOfScanB = 3;
    velocityOfVertScan = 6;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Particle Detector");
    r.SetTargetFPS(FPS);
}

function running() {
    return !r.WindowShouldClose();
}

function update() {
    xOfScanA = g.moveScanner(xOfScanA, velocityOfScanA);
    xOfScanB = g.moveScanner(xOfScanB, velocityOfScanB);
    yOfVertScan = g.moveScanner(yOfVertScan, velocityOfVertScan);

    velocityOfScanA = g.calculateVelocity(xOfScanA, scanALeftEdge, scanARightEdge, velocityOfScanA);
    velocityOfScanB = g.calculateVelocity(xOfScanB, scanBLeftEdge, scanBRightEdge, velocityOfScanB);
    velocityOfVertScan = g.calculateVelocity(yOfVertScan, vertScanLeftEdge, vertScanRightEdge, velocityOfVertScan);
}

function draw() {
    const scanY = 0;
    const scanHeight = HEIGHT;

    const xOfVertScan = 0;
    const vertScanWidth = WIDTH;

    const particleY = 0;
    const particleHeight = HEIGHT;

    const xOfVertParticle = 0;
    const vertParticleWidth = WIDTH;

    const colorOfScanA = g.isOverlapping(xOfScanA, scanWidth, xOfParticleA, widthOfParticleA, xOfParticleB, widthOfParticleB) ? r.ColorAlpha(r.RED, ALPHA) : r.WHITE;
    const colorOfScanB = g.isOverlapping(xOfScanB, scanWidth, xOfParticleA, widthOfParticleA, xOfParticleB, widthOfParticleB) ? r.ColorAlpha(r.RED, ALPHA) : r.WHITE;
    const colorOfVertScan = g.isOverlapping(yOfVertScan, vertScanHeight, yOfParticleC, heightOfParticleC) ? r.ColorAlpha(r.RED, ALPHA) : r.WHITE;

    r.BeginDrawing();

    r.ClearBackground(r.BLACK);

    // Scanners
    r.DrawRectangle(xOfParticleA, particleY, widthOfParticleA, particleHeight, r.SKYBLUE);
    r.DrawRectangle(xOfParticleB, particleY, widthOfParticleB, particleHeight, r.SKYBLUE);
    r.DrawRectangle(xOfVertParticle, yOfParticleC, vertParticleWidth, heightOfParticleC, r.SKYBLUE);

    // Particles
    r.DrawRectangle(xOfScanA, scanY, scanWidth, scanHeight, colorOfScanA);
    r.DrawRectangle(xOfScanB, scanY, scanWidth, scanHeight, colorOfScanB);
    r.DrawRectangle(xOfVertScan, yOfVertScan, vertScanWidth, vertScanHeight, colorOfVertScan);

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