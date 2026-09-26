const r = require("raylib");

const windowWidth = 900;
const windowHeight = 600;

let scannerX = 0;
const scannerWidth = 50;
const rightEdge = windowWidth - scannerWidth;
let scannerColor = r.WHITE;

let isScannerMovingForward = true;
const speed = 5;

const particleAX = 320;
const particleAWidth = 120;

const particleBX = 600;
const particleBWidth = 10;

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

function isOverlappingEither(scannerX, scannerWidth, particleAX, particleAWidth, particleBX, particleBWidth) {
    return (detectOverlapping(scannerX, scannerWidth, particleAX, particleAWidth) || detectOverlapping(scannerX, scannerWidth, particleBX, particleBWidth));
}

function update() {
    scannerX += moveScanner(isScannerMovingForward, speed);

    isScannerMovingForward = shouldScannerMoveForward(scannerX, rightEdge, isScannerMovingForward);

    scannerColor = isOverlappingEither(scannerX, scannerWidth, particleAX, particleAWidth, particleBX, particleBWidth) ? r.ColorAlpha(r.RED, 0.5) : r.WHITE;
}

function drawParticle(xPosition, yPosition, particleWidth, particleHeight) {
    r.DrawRectangle(xPosition, yPosition, particleWidth, particleHeight, r.SKYBLUE);
}

function draw() {
    const scannerY = 0;
    const scannerHeight = windowHeight;

    const particleAY = 0;
    const particleAHeight = windowHeight;

    const particleBY = 0;
    const particleBHeight = windowHeight;

    r.BeginDrawing();

    r.ClearBackground(r.BLACK);

    drawParticle(particleAX, particleAY, particleAWidth, particleAHeight);
    drawParticle(particleBX, particleBY, particleBWidth, particleBHeight);

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