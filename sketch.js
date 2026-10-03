const r = require("raylib");
const p = require("./particle");
const s = require("./scanner");

function setup() {
    const world = {};

    world.FPS = 60;
    world.WIDTH = 800;
    world.HEIGHT = 500;
    world.TITLE = "Particle Detector";

    world.p1 = p.createParticle(320, 0, 130, world.HEIGHT);
    world.p2 = p.createParticle(600, 0, 20, world.HEIGHT);
    world.p3 = p.createParticle(0, 350, world.WIDTH, 20);

    world.s1 = s.createScanner(0, 0, 40, world.HEIGHT, 0, (world.WIDTH / 2), 2);
    world.s2 = s.createScanner((world.WIDTH / 2), 0, 40, world.HEIGHT, (world.WIDTH / 2), world.WIDTH, 3);
    world.s3 = s.createScanner(0, 0, world.WIDTH, 40, 0, world.HEIGHT, 5);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.WIDTH, world.HEIGHT, world.TITLE);
    r.SetTargetFPS(world.FPS);

    return world;
}

function running() {
    return !r.WindowShouldClose();
}

function moveScanners(world) {
    world.s1.x = s.moveHorizontalScanner(world.s1);
    world.s2.x = s.moveHorizontalScanner(world.s2);
    world.s3.y = s.moveVerticalScanner(world.s3);
}

function determineScannersOverlapping(world) {
    world.s1.hasOverlap = s.detectHorizontalOverlaps(world.s1, world.p1, world.p2);
    world.s2.hasOverlap = s.detectHorizontalOverlaps(world.s2, world.p1, world.p2);
    world.s3.hasOverlap = s.detectVerticalOverlap(world.s3, world.p3);
}

function update(world) {
    moveScanners(world);
    determineScannersOverlapping(world);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    p.drawParticle(world.p1);
    p.drawParticle(world.p2);
    p.drawParticle(world.p3);

    s.drawScanner(world.s1);
    s.drawScanner(world.s2);
    s.drawScanner(world.s3);

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