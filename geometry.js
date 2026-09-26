function moveScanner(shouldMoveForward, speed) {
    return (shouldMoveForward) ? speed : -speed;
}

module.exports = {
    moveScanner
};