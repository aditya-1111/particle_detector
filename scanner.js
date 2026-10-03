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

function calculateVelocity(currentPosition, sc) {
    const isInsideRange = (currentPosition >= sc.end) || (currentPosition < sc.st);
    return isInsideRange ? -sc.velocity : sc.velocity;
}

function moveHorizontalScanner(currentPosition, sc) {
    sc.velocity = calculateVelocity(sc.x, sc);
    return currentPosition + sc.velocity;
}

function moveVerticalScanner(currentPosition, sc) {
    sc.velocity = calculateVelocity(sc.y, sc);
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

function detectOverlap(xOfRangeA, rangeAWidth, xOfRangeB, rangeBWidth) {
    const rangeARightEdge = xOfRangeA + rangeAWidth;
    const rangeBRightEdge = xOfRangeB + rangeBWidth;

    return ((rangeARightEdge >= xOfRangeB) && (xOfRangeA <= rangeBRightEdge));
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