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
        isDetected: false
    }
}

function calculateVelocity(currentPosition, end, sc) {
    const isInsideRange = (currentPosition >= end) || (currentPosition < sc.st);
    return isInsideRange ? -sc.velocity : sc.velocity;
}

function moveHorizontalScanner(currentPosition, sc) {
    const end = s.end - s.width;
    sc.velocity = calculateVelocity(sc.x, end, sc);
    return currentPosition + sc.velocity;
}

function moveVerticalScanner(currentPosition, sc) {
    const end = s.end - s.height;
    sc.velocity = calculateVelocity(sc.y, end, sc);
    return currentPosition + sc.velocity;
}

function getEnd(end, size) {
    return end - size;
}

function isOverlapping(scan, particleA, particleB) {
    const isOverlapInParticleA = detectOverlap(scan.x, scan.width, particleA.x, particleA.width);
    const isOverlapInParticleB = detectOverlap(scan.x, scan.width, particleB.x, particleB.width);

    return (isOverlapInParticleA || isOverlapInParticleB);
}

function detectOverlap(posOfRangeA, rangeAWidth, posOfRangeB, rangeBWidth) {
    const rangeARightEdge = posOfRangeA + rangeAWidth;
    const rangeBRightEdge = posOfRangeB + rangeBWidth;

    return ((rangeARightEdge >= posOfRangeB) && (posOfRangeA <= rangeBRightEdge));
}

function determineScannerColor(isOverlaping) {
    const ALPHA = 0.5;
    return isOverlaping ? r.ColorAlpha(r.RED, ALPHA) : r.WHITE;
}

function drawScanner(sc) {
    sc.color = determineScannerColor(sc.isDetected);
    r.DrawRectangleRec(sc, sc.color);
}

module.exports = {
    moveHorizontalScanner,
    moveVerticalScanner,
    createScanner,
    calculateVelocity,
    getEnd,
    isOverlapping,
    detectOverlap,
    drawScanner
}