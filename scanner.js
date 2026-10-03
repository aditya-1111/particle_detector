const r = require("raylib");

function calculateVelocity(currentPosition, sc) {
    const isInsideRange = (currentPosition >= sc.rightEdge) || (currentPosition < sc.leftEdge);

    return isInsideRange ? -sc.velocity : sc.velocity;
}

function createScanner(x, y, width, height, leftEdge, rightEdge, velocity = 5) {
    return {
        x,
        y,
        width,
        height,
        leftEdge,
        rightEdge,
        velocity,
        color: r.WHITE,
    }
}

function moveScanner(currentPosition, velocity) {
    return currentPosition + velocity;
}

function getRightEdge(rightEnding, size) {
    return rightEnding - size;
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

module.exports = {
    moveScanner,
    createScanner,
    calculateVelocity,
    getRightEdge,
    isOverlapping,
    detectOverlap
}