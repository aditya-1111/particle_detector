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

module.exports = {
    moveScanner,
    createScanner,
    calculateVelocity,
    getRightEdge
}