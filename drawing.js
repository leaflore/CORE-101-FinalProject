/*function setup() {
    createCanvas(100,  100, SVG)
    background(255)
    fill(150)
    stroke(150)
}

function draw() {
    var r = frameCount % 200 * Math.sqrt(2)
    background(255)
    ellipse(0, 0, r, r)
}*/

//let img

//My exercise to write notes of syntax to eventually memoorize it.
//Load the image and create :) a p5.Image object.
/*function preload() {
    img = loadImage('assets/20251208_SitePlanMain.svg')
}*/

function setup() {
    // Ensure the SVG and canvas container exist (map.js exposes helpers)
    if (window.insertMapSVG) window.insertMapSVG('svg-container')
    if (window.ensureCanvasContainer) window.ensureCanvasContainer('svg-container', 'canvas-container')

    const canvas = createCanvas(1366, 768)
    canvas.parent('canvas-container')

    //Draw the image
    /*image(img, 0,0)*/
    // Apply any pending resize requested before p5 was ready
    _applyPendingP5Resize()
}

// Handle resize requests from map.js: call p5's resizeCanvas when asked
window.addEventListener('p5resize', (e) => {
    const d = e && e.detail ? e.detail : null
    if (!d) return
    if (typeof resizeCanvas === 'function') {
        resizeCanvas(d.width, d.height)
    } else {
        // If p5 hasn't initialized yet, store pending request
        window.__pendingP5Resize = d
    }
})

// If a resize request arrived before setup ran, apply it after setup
function _applyPendingP5Resize() {
    if (window.__pendingP5Resize && typeof resizeCanvas === 'function') {
        const d = window.__pendingP5Resize
        resizeCanvas(d.width, d.height)
        delete window.__pendingP5Resize
    }
}

function draw(){
    clear()

    stroke(255, 0, 0)
    strokeWeight(4)
    line(mouseX, mouseY, width/2, height/2)

    noFill()
    ellipse(width/2, height/2, 100, 100)
}
