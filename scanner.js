const r = require("raylib");

function calculateVelocity(currentPosition, sc) {
    const isInsideRange = (currentPosition >= sc.rightEdge) || (currentPosition < sc.leftEdge);

    return isInsideRange ? -sc.velocity : sc.velocity;
}

function createScanner(x, y, width, height, velocity = 5,) {
    return {
        x,
        y,
        width,
        height,
        velocity,
        color: r.WHITE,
    }
}

function moveScanner(currentPosition, velocity) {
    return currentPosition + velocity;
}

module.exports = {
    moveScanner,
    createScanner,
    calculateVelocity
}