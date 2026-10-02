

// Particle C
const c = {
    x: 0,
    y: 350,
    height: 20,
}

let height;
let vertWidth;

function createParticle(x, y, width, height) {
    return {
        x,
        y,
        width,
        height
    }
}

module.exports = {
    height,
    vertWidth,
    c,
    createParticle
}