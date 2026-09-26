const r = require("raylib");

const windowWidth = 900
const windowHeight = 600

const scannerWidth = 50;
const scannerHeight = windowHeight;
const rightEdge = windowWidth - scannerWidth;

let scannerX = 0;
let scannerY = 0;
let isScannerMovingForward = true;

function setup() {
    2
    r.InitWindow(windowWidth, windowHeight, "Particle Detector")
    r.SetTargetFPS(60)
}

function moveScanner(shouldMoveForward) {
    return (shouldMoveForward) ? 5 : -5;
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
    scannerX += moveScanner(isScannerMovingForward);

    isScannerMovingForward = shouldScannerMoveForward(scannerX, rightEdge, isScannerMovingForward);
}

function draw() {
    r.BeginDrawing()
    r.ClearBackground(r.BLACK)

    r.DrawRectangle(scannerX, scannerY, scannerWidth, scannerHeight, r.WHITE)

    r.EndDrawing()
}

function running() {
    return !r.WindowShouldClose();
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