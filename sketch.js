const r = require("raylib");

const windowWidth = 900
const windowHeight = 600

let scannerX = 0;
const scannerWidth = 50;
const rightEdge = windowWidth - scannerWidth;

let isScannerMovingForward = true;
const speed = 5;

const particleX = 350;
const particleWidth = 120;

function setup() {
    r.InitWindow(windowWidth, windowHeight, "Particle Detector");
    r.SetTargetFPS(60);
}

function running() {
    return !r.WindowShouldClose();
}

function moveScanner(shouldMoveForward, speed) {
    return (shouldMoveForward) ? speed : -speed;
}

function shouldScannerMoveForward(currentPosition, endFromRight, isScannerMovingForward) {
    if (currentPosition >= endFromRight) {
        return false;
    }
    if (currentPosition < 0) {
        return true;
    }

    return isScannerMovingForward;
}

function update() {
    scannerX += moveScanner(isScannerMovingForward, speed);

    isScannerMovingForward = shouldScannerMoveForward(scannerX, rightEdge, isScannerMovingForward);
}

function draw() {
    const scannerY = 0;
    const scannerHeight = windowHeight;

    const particleY = 0;
    const particleHeight = windowHeight;

    r.BeginDrawing()

    r.ClearBackground(r.BLACK)

    r.DrawRectangle(particleX, particleY, particleWidth, particleHeight, r.SKYBLUE)
    r.DrawRectangle(scannerX, scannerY, scannerWidth, scannerHeight, r.WHITE)

    r.EndDrawing()
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