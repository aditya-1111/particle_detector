const r = require("raylib");

const windowWidth = 900;
const windowHeight = 600;

let scannerX = 0;
const scannerWidth = 50;
const rightEdge = windowWidth - scannerWidth;
let scannerColor = r.WHITE;

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

function detectOverlapping(rangeAX, rangeAWidth, rangeBX, rangeBWidth) {
    const rangeARightEdge = rangeAX + rangeAWidth;
    const rangeBRightEdge = rangeBX + rangeBWidth;

    if (rangeARightEdge >= rangeBX && rangeAX <= rangeBRightEdge) {
        return true;
    }

    return false;
}

function update() {
    scannerX += moveScanner(isScannerMovingForward, speed);

    isScannerMovingForward = shouldScannerMoveForward(scannerX, rightEdge, isScannerMovingForward);

    scannerColor = detectOverlapping(scannerX, scannerWidth, particleX, particleWidth) ? r.RED : r.WHITE;
}

function drawParticle(xPosition, particleWidth) {
    r.DrawRectangle(xPosition, 0, particleWidth, windowHeight, r.SKYBLUE);
}

function draw() {
    const scannerY = 0;
    const scannerHeight = windowHeight;

    r.BeginDrawing();

    r.ClearBackground(r.BLACK);

    drawParticle(particleX, particleWidth);
    r.DrawRectangle(scannerX, scannerY, scannerWidth, scannerHeight, scannerColor);

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