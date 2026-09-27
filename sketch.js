const r = require("raylib");
const geo = require("./geometry");

const windowWidth = 900;
const windowHeight = 500;

const scanWidth = 40;

let xOfScanA = 0;
const scanALeftEdge = 0;
const scanARightEdge = windowWidth / 2 - scanWidth;

let xOfScanB = windowWidth / 2;
const scanBLeftEdge = windowWidth / 2;
const scanBRightEdge = windowWidth - scanWidth;

const vertScanHeight = 40;
let yOfVertScan = 0;
const vertScanLeftEdge = 0;
const vertScanRightEdge = windowHeight - vertScanHeight;

let isScanAAhead = true;
let isScanBAhead = true;
let isVertScanAhead = true;

const speedOfScanA = 5;
const speedOfScanB = 3;
const speedOfVertScan = 3;

const xOfParticleA = 320;
const widthOfParticleA = 130;

const xOfParticleB = 600;
const widthOfParticleB = 20;

const yOfParticleC = 350;
const heightOfParticleC = 20;

function setup() {
    r.InitWindow(windowWidth, windowHeight, "Particle Detector");
    r.SetTargetFPS(60);
    r.SetTraceLogLevel(r.LOG_NONE);
}

function running() {
    return !r.WindowShouldClose();
}

function shouldMoveAhead(currentPosition, stRange, endRange, isAhead) {
    const isInsideRange = (currentPosition >= stRange) || (currentPosition < endRange);

    return isInsideRange ? !isAhead : isAhead;
}

function update() {
    xOfScanA += geo.moveScanner(isScanAAhead, speedOfScanA);

    xOfScanB += geo.moveScanner(isScanBAhead, speedOfScanB);

    yOfVertScan += geo.moveScanner(isVertScanAhead, speedOfVertScan);
}

function draw() {
    const scanY = 0;
    const scanHeight = windowHeight;

    const xOfVertScan = 0;
    const vertScanWidth = windowWidth;

    const particleY = 0;
    const particleHeight = windowHeight;

    const xOfVertParticle = 0;
    const vertParticleWidth = windowWidth;

    const colorOfScanA = geo.isOverlapping(xOfScanA, scanWidth, xOfParticleA, widthOfParticleA, xOfParticleB, widthOfParticleB) ? r.ColorAlpha(r.RED, 0.5) : r.WHITE;

    const colorOfScanB = geo.isOverlapping(xOfScanB, scanWidth, xOfParticleA, widthOfParticleA, xOfParticleB, widthOfParticleB) ? r.ColorAlpha(r.RED, 0.5) : r.WHITE;

    const colorOfVertScan = geo.isOverlapping(yOfVertScan, vertScanHeight, yOfParticleC, heightOfParticleC) ? r.ColorAlpha(r.RED, 0.5) : r.WHITE;

    isScanAAhead = shouldMoveAhead(xOfScanA, scanARightEdge, scanALeftEdge, isScanAAhead);

    isScanBAhead = shouldMoveAhead(xOfScanB, scanBRightEdge, scanBLeftEdge, isScanBAhead);

    isVertScanAhead = shouldMoveAhead(yOfVertScan, vertScanRightEdge, vertScanLeftEdge, isVertScanAhead);

    r.BeginDrawing();

    r.ClearBackground(r.BLACK);

    r.DrawRectangle(xOfParticleA, particleY, widthOfParticleA, particleHeight, r.SKYBLUE);
    r.DrawRectangle(xOfParticleB, particleY, widthOfParticleB, particleHeight, r.SKYBLUE);
    r.DrawRectangle(xOfVertParticle, yOfParticleC, vertParticleWidth, heightOfParticleC, r.SKYBLUE);

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