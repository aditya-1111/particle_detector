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
    isOverlapping,
    detectOverlap,
};