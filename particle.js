const r = require("raylib");

function createParticle(x, y, width, height) {
    return {
        x,
        y,
        width,
        height
    }
}

function drawParticle(p) {
    r.DrawRectangleRec(p, r.SKYBLUE);
}

module.exports = {
    createParticle,
    drawParticle
}