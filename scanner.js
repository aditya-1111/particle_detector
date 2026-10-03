const r = require("raylib");

function createScanner(x, y, width, height, st, end, velocity = 5) {
    return {
        x,
        y,
        width,
        height,
        st,
        end,
        velocity,
        color: r.WHITE,
        hasOverlap: false
    }
}

function calculateVelocity(currentPosition, end, s) {
    const isInsideRange = (currentPosition >= end) || (currentPosition < s.st);
    return isInsideRange ? -s.velocity : s.velocity;
}

function moveHorizontalScanner(currentPosition, s) {
    const end = s.end - s.width;
    s.velocity = calculateVelocity(s.x, end, s);

    return currentPosition + s.velocity;
}

function moveVerticalScanner(currentPosition, s) {
    const end = s.end - s.height;
    s.velocity = calculateVelocity(s.y, end, s);

    return currentPosition + s.velocity;
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

function determineScannerColor(isOverlaping) {
    const ALPHA = 0.5;
    return isOverlaping ? r.ColorAlpha(r.RED, ALPHA) : r.WHITE;
}

function drawScanner(sc) {
    sc.color = determineScannerColor(sc.hasOverlap);
    r.DrawRectangleRec(sc, sc.color);
}

module.exports = {
    moveHorizontalScanner,
    moveVerticalScanner,
    createScanner,
    calculateVelocity,
    detectHorizontalOverlap,
    detectVerticalOverlap,
    drawScanner
}