const r = require("raylib");
const p = require("./particle");
const sc = require("./scanner");

function setup() {
    const world = {};

    world.FPS = 60;
    world.WIDTH = 800;
    world.HEIGHT = 500;
    world.TITLE = "Particle Detector";

    world.p1 = p.createParticle(320, 0, 130, world.HEIGHT);
    world.p2 = p.createParticle(600, 0, 20, world.HEIGHT);
    world.p3 = p.createParticle(0, 350, world.WIDTH, 20);

    world.s1 = sc.createScanner(0, 0, 40, world.HEIGHT, 0, 0, 2);
    world.s2 = sc.createScanner((world.WIDTH / 2), 0, 40, world.HEIGHT, (world.WIDTH / 2), 0, 3);
    world.s3 = sc.createScanner(0, 0, world.WIDTH, 40, 0, 0, 5);

    world.s1.end = sc.getEnd((world.WIDTH / 2), world.s1.width);
    world.s2.end = sc.getEnd(world.WIDTH, world.s2.width);
    world.s3.end = sc.getEnd(world.HEIGHT, world.s3.height);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.WIDTH, world.HEIGHT, world.TITLE);
    r.SetTargetFPS(world.FPS);

    return world;
}

function running() {
    return !r.WindowShouldClose();
}

function moveScanners(world) {
    world.s1.x = sc.moveHorizontalScanner(world.s1.x, world.s1);
    world.s2.x = sc.moveHorizontalScanner(world.s2.x, world.s2);
    world.s3.y = sc.moveVerticalScanner(world.s3.y, world.s3);
}

function determineScannersOverlapping(world) {
    world.s1.isDetected = sc.isOverlapping(world.s1, world.p1, world.p2);
    world.s2.isDetected = sc.isOverlapping(world.s2, world.p1, world.p2);
    world.s3.isDetected = sc.detectOverlap(world.s3.y, world.s3.height, world.p3.y, world.p3.height);
}

function update(world) {
    moveScanners(world);
    determineScannersOverlapping(world);
}

function drawParticles(world) {
    p.drawParticle(world.p1);
    p.drawParticle(world.p2);
    p.drawParticle(world.p3);
}

function drawScanners(world) {
    sc.drawScanner(world.s1);
    sc.drawScanner(world.s2);
    sc.drawScanner(world.s3);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawParticles(world);
    drawScanners(world);

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