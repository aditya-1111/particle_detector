const r = require("raylib");
const geo = require("./geometry");

const windowWidth = 900;
const windowHeight = 500;

const scanWidth = 50;

let xOfScanA = 0;
let colorOfScanA = r.WHITE;
const scanARightEdge = windowWidth / 2 - scanWidth;
const scanALeftEdge = 0;

let xOfScanB = windowWidth / 2;
let colorOfScanB = r.WHITE;
const scanBRightEdge = windowWidth - scanWidth;
const scanBLeftEdge = windowWidth / 2;

let isScanAMovingForward = true;
let isScanBMovingForward = true;

const speedOfScanA = 5;
const speedOfScanB = 3;

const xOfParticleA = 320;
const widthOfParticleA = 130;

const xOfParticleB = 600;
const widthOfParticleB = 20;

function setup() {
    r.InitWindow(windowWidth, windowHeight, "Particle Detector");
    r.SetTargetFPS(60);
}

function running() {
    return !r.WindowShouldClose();
}

function shouldMoveForward(currentPosition, stRange, endRange, isMovingForward) {
    const isInsideRange = (currentPosition >= stRange) || (currentPosition < endRange)
    return isInsideRange ? !isMovingForward : isMovingForward;
}

function detectOverlap(xOfRangeA, rangeAWidth, xOfRangeB, rangeBWidth) {
    const rangeARightEdge = xOfRangeA + rangeAWidth;
    const rangeBRightEdge = xOfRangeB + rangeBWidth;

    return ((rangeARightEdge >= xOfRangeB) && (xOfRangeA <= rangeBRightEdge));
}

function isOverlapping(scanX, scanWidth, xOfParticleA, particleAWidth, xOfParticleB, particleBWidth) {
    const isOverlappingParticleA = detectOverlap(scanX, scanWidth, xOfParticleA, particleAWidth);

    const isOverlappingParticleB = detectOverlap(scanX, scanWidth, xOfParticleB, particleBWidth);

    return (isOverlappingParticleA || isOverlappingParticleB);
}

function update() {
    xOfScanA += geo.moveScanner(isScanAMovingForward, speedOfScanA);
    xOfScanB += geo.moveScanner(isScanBMovingForward, speedOfScanB);

    isScanAMovingForward = shouldMoveForward(xOfScanA, scanARightEdge, scanALeftEdge, isScanAMovingForward);

    isScanBMovingForward = shouldMoveForward(xOfScanB, scanBRightEdge, scanBLeftEdge, isScanBMovingForward);

    colorOfScanA = isOverlapping(xOfScanA, scanWidth, xOfParticleA, widthOfParticleA, xOfParticleB, widthOfParticleB) ? r.ColorAlpha(r.RED, 0.5) : r.WHITE;

    colorOfScanB = isOverlapping(xOfScanB, scanWidth, xOfParticleA, widthOfParticleA, xOfParticleB, widthOfParticleB) ? r.ColorAlpha(r.RED, 0.5) : r.WHITE;
}

function draw() {
    const scanY = 0;
    const scanHeight = windowHeight;

    const particleY = 0;
    const particleHeight = windowHeight;

    r.BeginDrawing();

    r.ClearBackground(r.BLACK);

    r.DrawRectangle(xOfParticleA, particleY, widthOfParticleA, particleHeight, r.SKYBLUE);
    r.DrawRectangle(xOfParticleB, particleY, widthOfParticleB, particleHeight, r.SKYBLUE);

    r.DrawRectangle(xOfScanA, scanY, scanWidth, scanHeight, colorOfScanA);
    r.DrawRectangle(xOfScanB, scanY, scanWidth, scanHeight, colorOfScanB);

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