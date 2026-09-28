const r = require("raylib");
const g = require("./geometry");
const p = require("./particle");
const s1 = require("./s1");
const s2 = require("./s2");
const s3 = require("./s3");

const WIDTH = 800;
const HEIGHT = 500;
const ALPHA = 0.5;

const scanWidth = 40;

function setup() {
    const FPS = 60;

    p.particleHeight = HEIGHT;
    p.vertParticleWidth = WIDTH;

    s2.x = WIDTH / 2;
    s1.rightEdge = WIDTH / 2 - scanWidth;

    s2.leftEdge = WIDTH / 2;
    s2.rightEdge = WIDTH - scanWidth;

    s3.rightEdge = HEIGHT - s3.height;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Particle Detector");
    r.SetTargetFPS(FPS);
}

function running() {
    return !r.WindowShouldClose();
}

function updateVelocities() {
    s1.velocity = g.calculateVelocity(s1.x, s1.leftEdge, s1.rightEdge, s1.velocity);
    s2.velocity = g.calculateVelocity(s2.x, s2.leftEdge, s2.rightEdge, s2.velocity);
    s3.velocity = g.calculateVelocity(s3.y, s3.leftEdge, s3.rightEdge, s3.velocity);
}

function moveScanners() {
    s1.x = g.moveScanner(s1.x, s1.velocity);
    s2.x = g.moveScanner(s2.x, s2.velocity);
    s3.y = g.moveScanner(s3.y, s3.velocity);
}

function decideScannerColor(isOverlapped) {
    return isOverlapped ? r.ColorAlpha(r.RED, ALPHA) : r.WHITE;
}

function determineScannersColours() {
    s1.color = decideScannerColor(g.isOverlapping(s1.x, scanWidth, p.xOfA, p.widthOfA, p.xOfB, p.widthOfB));
    s2.color = decideScannerColor(g.isOverlapping(s2.x, scanWidth, p.xOfA, p.widthOfA, p.xOfB, p.widthOfB));
    s3.color = decideScannerColor(g.isOverlapping(s3.y, s3.height, p.yOfC, p.heightOfC));
}

function update() {
    moveScanners();
    updateVelocities();
    determineScannersColours();
}

function drawParticles() {
    r.DrawRectangle(p.xOfA, p.particleY, p.widthOfA, p.particleHeight, r.SKYBLUE);
    r.DrawRectangle(p.xOfB, p.particleY, p.widthOfB, p.particleHeight, r.SKYBLUE);
    r.DrawRectangle(p.xOfVert, p.yOfC, p.vertParticleWidth, p.heightOfC, r.SKYBLUE);
}

function drawScanners() {
    const scanHeight = HEIGHT;
    const vertScanWidth = WIDTH;

    r.DrawRectangle(s1.x, s1.y, scanWidth, scanHeight, s1.color);
    r.DrawRectangle(s2.x, s2.y, scanWidth, scanHeight, s2.color);
    r.DrawRectangle(s3.x, s3.y, vertScanWidth, s3.height, s3.color);
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