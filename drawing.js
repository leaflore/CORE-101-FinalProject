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

let img

//My exercise to write notes of syntax to eventually memoorize it.
//Load the image and create :) a p5.Image object.
function preload() {
    img = loadImage('assets/20251208_SitePlanMain.svg')
}

function setup() {
    createCanvas(1366, 768, SVG)
    background(255)

    //Draw the image
    image(img, 0,0)

    describe('Image of the underside of a white umbrella and a gridded ceiling.')
}
