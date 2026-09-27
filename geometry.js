function moveScanner(shouldMoveForward, speed) {
    return (shouldMoveForward) ? speed : -speed;
}

function isOverlapping(scanX, scanWidth, xOfParticleA, particleAWidth, xOfParticleB, particleBWidth) {
    const isOverlappingParticleA = detectOverlap(scanX, scanWidth, xOfParticleA, particleAWidth);

    const isOverlappingParticleB = detectOverlap(scanX, scanWidth, xOfParticleB, particleBWidth);

    return (isOverlappingParticleA || isOverlappingParticleB);
}

function detectOverlap(xOfRangeA, rangeAWidth, xOfRangeB, rangeBWidth) {
    const rangeARightEdge = xOfRangeA + rangeAWidth;
    const rangeBRightEdge = xOfRangeB + rangeBWidth;

    return ((rangeARightEdge >= xOfRangeB) && (xOfRangeA <= rangeBRightEdge));
}

module.exports = {
    moveScanner,
    isOverlapping,
};