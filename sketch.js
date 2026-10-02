const r = require("raylib");
const g = require("./geometry");
const p = require("./particle");
const sc = require("./scanner");

const WIDTH = 800;
const HEIGHT = 500;
const ALPHA = 0.5;

let p1;
let p2;
let p3;

let s1;
let s2;
let s3;

function setup() {
    const FPS = 60;

    p1 = p.createParticle(320, 0, 130, HEIGHT);
    p2 = p.createParticle(600, 0, 20, HEIGHT);
    p3 = p.createParticle(0, 350, WIDTH, 20);

    s1 = sc.createScanner(0, 0, 40, HEIGHT, 3);
    s2 = sc.createScanner((WIDTH / 2), 0, 40, HEIGHT, 6);
    s3 = sc.createScanner(0, 0, WIDTH, 40, 2);

    s1.rightEdge = (WIDTH / 2) - s1.width;
    s1.leftEdge = 0;

    s2.leftEdge = WIDTH / 2;
    s2.rightEdge = WIDTH - s2.width;

    s3.rightEdge = HEIGHT - s3.height;
    s3.leftEdge = 0

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Particle Detector");
    r.SetTargetFPS(FPS);
}

function running() {
    return !r.WindowShouldClose();
}

function updateVelocities() {
    s1.velocity = sc.calculateVelocity(s1.x, s1);
    s2.velocity = sc.calculateVelocity(s2.x, s2);
    s3.velocity = sc.calculateVelocity(s3.y, s3);
}

function moveScanners() {
    s1.x = sc.moveScanner(s1.x, s1.velocity);
    s2.x = sc.moveScanner(s2.x, s2.velocity);
    s3.y = sc.moveScanner(s3.y, s3.velocity);
}

function decideScannerColor(isOverlapped) {
    return isOverlapped ? r.ColorAlpha(r.RED, ALPHA) : r.WHITE;
}

function determineScannersColours() {
    s1.color = decideScannerColor(g.isOverlapping(s1, p1, p2));
    s2.color = decideScannerColor(g.isOverlapping(s2, p1, p2));
    s3.color = decideScannerColor(g.detectOverlap(s3.y, s3.height, p.c.y, p.c.height));
}

function update() {
    moveScanners();
    updateVelocities();
    determineScannersColours();
}

function drawParticles() {
    r.DrawRectangleRec(p1, r.SKYBLUE);
    r.DrawRectangleRec(p2, r.SKYBLUE);
    r.DrawRectangleRec(p3, r.SKYBLUE);
}

function drawScanners() {

    r.DrawRectangleRec(s1, s1.color);
    r.DrawRectangleRec(s2, s2.color);
    r.DrawRectangleRec(s3, s3.color);
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