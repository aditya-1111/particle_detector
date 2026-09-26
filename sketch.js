const r = require("raylib");

const windowWidth = 900;
const windowHeight = 500;

const scannerWidth = 50;

let scannerAX = 0;
let scannerAColor = r.WHITE;
const scanARightEdge = windowWidth / 2 - scannerWidth;
const scanALeftEnd = 0;

let scannerBX = windowWidth / 2;
let scannerBColor = r.WHITE;
const scanBRightEdge = windowWidth - scannerWidth;
const scanBLeftEdge = windowWidth / 2;

let scannerAForward = true;
let scannerBForward = true;

const scannerASpeed = 5;
const scannerBSpeed = 3;

const particleAX = 320;
const particleAWidth = 130;

const particleBX = 600;
const particleBWidth = 20;

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

function shouldMoveForward(currentPosition, endFromRight, endFromLeft, isMovingForward) {

    return (currentPosition >= endFromRight) || (currentPosition < endFromLeft) ? !isMovingForward : isMovingForward;
}

function detectOverlap(rangeAX, rangeAWidth, rangeBX, rangeBWidth) {
    const rangeARightEdge = rangeAX + rangeAWidth;
    const rangeBRightEdge = rangeBX + rangeBWidth;

    return (rangeARightEdge >= rangeBX && rangeAX <= rangeBRightEdge);
}

function isOverlapping(scannerX, scannerWidth, particleAX, particleAWidth, particleBX, particleBWidth) {
    return (detectOverlap(scannerX, scannerWidth, particleAX, particleAWidth) || detectOverlap(scannerX, scannerWidth, particleBX, particleBWidth));
}

function update() {
    scannerAX += moveScanner(scannerAForward, scannerASpeed);
    scannerBX += moveScanner(scannerBForward, scannerBSpeed);

    scannerAForward = shouldMoveForward(scannerAX, scanARightEdge, scanALeftEnd, scannerAForward);

    scannerBForward = shouldMoveForward(scannerBX, scanBRightEdge, scanBLeftEdge, scannerBForward);

    scannerAColor = isOverlapping(scannerAX, scannerWidth, particleAX, particleAWidth, particleBX, particleBWidth) ? r.ColorAlpha(r.RED, 0.5) : r.WHITE;

    scannerBColor = isOverlapping(scannerBX, scannerWidth, particleAX, particleAWidth, particleBX, particleBWidth) ? r.ColorAlpha(r.RED, 0.5) : r.WHITE;
}

function draw() {
    const scannerY = 0;
    const scannerHeight = windowHeight;

    const particleY = 0;
    const particleHeight = windowHeight;

    r.BeginDrawing();

    r.ClearBackground(r.BLACK);

    r.DrawRectangle(particleAX, particleY, particleAWidth, particleHeight, r.SKYBLUE);
    r.DrawRectangle(particleBX, particleY, particleBWidth, particleHeight, r.SKYBLUE);

    r.DrawRectangle(scannerAX, scannerY, scannerWidth, scannerHeight, scannerAColor);
    r.DrawRectangle(scannerBX, scannerY, scannerWidth, scannerHeight, scannerBColor);

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