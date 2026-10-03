const r = require("raylib");

function createScanner(x, y, width, height, st, end, velocity) {
    return {
        x,
        y,
        width,
        height,
        st,
        end,
        velocity,
        hasOverlap: false
    }
}

function calculateVelocity(currentPosition, end, s) {
    const isInsideRange = (currentPosition >= end) || (currentPosition < s.st);
    return isInsideRange ? -s.velocity : s.velocity;
}

function moveHorizontalScanner(s) {
    const end = s.end - s.width;
    s.velocity = calculateVelocity(s.x, end, s);

    return s.x + s.velocity;
}

function moveVerticalScanner(s) {
    const end = s.end - s.height;
    s.velocity = calculateVelocity(s.y, end, s);

    return s.y + s.velocity;
}

function detectHorizontalOverlaps(s, p1, p2) {
    return ((detectHorizontalOverlap(s, p1)) || (detectHorizontalOverlap(s, p2)));
}

function detectHorizontalOverlap(rangeA, rangeB) {
    const rangeARightEdge = rangeA.x + rangeA.width;
    const rangeBRightEdge = rangeB.x + rangeB.width;

    return ((rangeARightEdge >= rangeB.x) && (rangeA.x <= rangeBRightEdge))
}


function detectVerticalOverlap(rangeA, rangeB) {
    const rangeARightEdge = rangeA.y + rangeA.height;
    const rangeBRightEdge = rangeB.y + rangeB.height;

    return ((rangeARightEdge >= rangeB.y) && (rangeA.y <= rangeBRightEdge))
}

function drawScanner(sc) {
    const color = sc.hasOverlap ? r.ColorAlpha(r.RED, 0.5) : r.WHITE;
    r.DrawRectangleRec(sc, color);
}

module.exports = {
    moveHorizontalScanner,
    moveVerticalScanner,
    createScanner,
    calculateVelocity,
    detectHorizontalOverlaps,
    detectVerticalOverlap,
    drawScanner
}