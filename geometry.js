function moveScanner(currentPosition, velocity) {
    return currentPosition + velocity;
}

function calculateVelocity(currentPosition, stRange, endRange, velocity) {
    const isInsideRange = (currentPosition >= endRange) || (currentPosition < stRange);

    return isInsideRange ? -velocity : velocity;
}

function isOverlapping(scanX, scanWidth, xOfParticleA, particleAWidth, xOfParticleB, particleBWidth) {
    const isOverlapInParticleA = detectOverlap(scanX, scanWidth, xOfParticleA, particleAWidth);
    const isOverlapInParticleB = detectOverlap(scanX, scanWidth, xOfParticleB, particleBWidth);

    return (isOverlapInParticleA || isOverlapInParticleB);
}

function detectOverlap(xOfRangeA, rangeAWidth, xOfRangeB, rangeBWidth) {
    const rangeARightEdge = xOfRangeA + rangeAWidth;
    const rangeBRightEdge = xOfRangeB + rangeBWidth;

    return ((rangeARightEdge >= xOfRangeB) && (xOfRangeA <= rangeBRightEdge));
}

module.exports = {
    moveScanner,
    isOverlapping,
    calculateVelocity
};